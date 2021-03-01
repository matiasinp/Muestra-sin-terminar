# Generated by Django 3.1.2 on 2020-11-17 18:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0007_auto_20201117_1342'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='mobile',
        ),
        migrations.CreateModel(
            name='Mobiles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.IntegerField(blank=True, default=None, null=True)),
                ('image', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='project.images')),
            ],
        ),
    ]