# Generated by Django 5.0.1 on 2024-05-13 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('poster', models.URLField()),
                ('genres', models.CharField(max_length=100)),
                ('rating', models.FloatField()),
                ('year_release', models.IntegerField()),
                ('metacritic_rating', models.IntegerField()),
                ('runtime', models.IntegerField()),
            ],
        ),
    ]
