from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=100)
    poster = models.URLField()
    genre = models.CharField(max_length=100)
    rated = models.CharField(max_length=50)
    year = models.IntegerField()
    meta_score = models.IntegerField()
    runtime = models.IntegerField()
    plot = models.TextField()
    director = models.CharField(max_length=100)
    actors = models.TextField()
    language = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    awards = models.TextField()
    imdb_rating = models.FloatField()
    imdb_votes = models.IntegerField()
    imdb_id = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    dvd = models.DateField()
    box_office = models.CharField(max_length=50)
    production = models.CharField(max_length=100)
    website = models.URLField()

    def __str__(self):
        return self.title
