from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save

# Models

class Areas(models.Model):
  title = models.TextField()
  description = models.TextField(default=None, blank=True, null=True)
  index = models.IntegerField()

  def _str_(self):
    return self.title

class BrandManager(models.Manager):
    def get_row(self, id, columns):
        if len(columns) > 0:
            columns_str = columns[0]
            for i in range(1, len(columns)):
                columns_str += f', {columns[i]}'

        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute(f"""
                SELECT {columns_str}
                FROM project_brands
                WHERE id = {id}""")

            row = cursor.fetchone()

        return row

class Brands(models.Model):
    title = models.TextField()
    description = models.TextField(default=None, blank=True, null=True)
    image = models.ImageField(upload_to=f'non-static/brands', default='default/img.png')

    objects = BrandManager()

    def delete(self, keep_parents=True):
        if '\\non-static\\brands\\' in self.image.storage.path(self.image.name):
            self.image.storage.delete(self.image.name)
        super().delete()

    def _str_(self):
      return self.title

class AreasBrands(models.Model):
    title = models.TextField()
    description = models.TextField(default=None, blank=True, null=True)
    image = models.ImageField(upload_to='non-static/areaBrands', default='default/img.png')
    area = models.ForeignKey(Areas, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brands, on_delete=models.CASCADE)
    __original_image = None

    def delete(self, keep_parents=True):
        if '\\non-static\\areaBrands\\' in self.image.storage.path(self.image.name):
            self.image.storage.delete(self.image.name)
        super().delete()


class Methods(models.Model):
    title = models.TextField()
    description = models.TextField(default=None, blank=True, null=True)
    image = models.ImageField(upload_to='non-static/methods', default='default/img.png')
    areaBrand = models.ForeignKey(AreasBrands, on_delete=models.CASCADE)

    def delete(self, keep_parents=True):
        if '\\non-static\\methods\\' in self.image.storage.path(self.image.name):
            self.image.storage.delete(self.image.name)
        super().delete()

    def _str_(self):
      return self.title

class Products(models.Model):
    title = models.TextField()
    description = models.TextField(default=None, blank=True, null=True)
    image = models.ImageField(upload_to='non-static/products', default='default/img.png')
    code = models.TextField()
    url = models.URLField(default=None, blank=True, null=True)
    method = models.ForeignKey(Methods, on_delete=models.CASCADE)



    def delete(self, keep_parents=True):
        if '\\non-static\\products\\' in self.image.storage.path(self.image.name):
            self.image.storage.delete(self.image.name)
        super().delete()

    def _str_(self):
      return self.title

class News(models.Model):
    title = models.TextField()
    description = models.TextField(default=None, blank=True, null=True)
    shortDescription = models.CharField(max_length=120, default=None, blank=True, null=True)
    importance = models.IntegerField()
    date = models.DateField()

    def _str_(self):
      return self.title

class Images(models.Model):
    image = models.ImageField(upload_to='non-static/images', default='default/img.png')
    index = models.IntegerField()
    new = models.ForeignKey(News, on_delete=models.CASCADE)

    def delete(self, keep_parents=True):
        if '\\non-static\\images\\' in self.image.storage.path(self.image.name):
            self.image.storage.delete(self.image.name)
        super().delete()

class Crops(models.Model):
    point = models.IntegerField(default=None, blank=True, null=True)
    image = models.OneToOneField(Images, unique=True, on_delete=models.CASCADE)

# Signals

@receiver(pre_save, sender=Brands)
@receiver(pre_save, sender=Methods)
@receiver(pre_save, sender=Products)
def do_something_if_changed(sender, instance, **kwargs):
    try:
        object = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        pass
    else:
        if not object.image == instance.image:
            object.image.storage.delete(object.image.name)

@receiver(pre_save, sender=AreasBrands)
def do_something_if_changed(sender, instance, **kwargs):
    try:
        object = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        pass
    else:
        if not object.image == instance.image:
            if '\\non-static\\areaBrands\\' in object.image.storage.path(object.image.name):
                object.image.storage.delete(object.image.name)

# falta resolución máxima
@receiver(post_save, sender=Images)
def refit_image(sender, instance, **kwargs):
    try:
        object = sender.objects.get(pk=instance.pk)
        image = Image.open(object.image)
        if image.width > image.height:
            if image.width / image.height > 16/9:
                width = image.height * (16/9)
                x = (image.width - width) / 2
                image = image.crop((x, 0, x + width, image.height))
                segments = str(object.image).split('/')[-3:]
                image.save(f"./{segments[0]}/{segments[1]}/{segments[2]}", quality=95, optimize=True)
                image.close();

            elif image.width / image.height < 16/9:
                height = image.width * (9/16)
                y = (image.height - height) / 2
                image = image.crop((0, y, image.width, y + height))
                segments = str(object.image).split('/')[-3:]
                image.save(f"./{segments[0]}/{segments[1]}/{segments[2]}", quality=95, optimize=True)
                image.close();
    except sender.DoesNotExist:
        pass
