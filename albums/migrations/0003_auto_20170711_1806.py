# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-11 18:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0002_auto_20170711_1733'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='List',
            new_name='Record',
        ),
    ]
