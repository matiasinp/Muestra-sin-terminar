# Generated by Django 3.1.2 on 2020-11-10 18:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_areas_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='areas',
            name='description',
        ),
    ]