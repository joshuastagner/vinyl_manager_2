from django.db import models
from django.contrib.auth.models import User

class Artist(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=80)
    year = models.IntegerField()
    artist = models.ForeignKey(Artist)

    def __str__(self):
        return self.title

class Record(models.Model):
    user = models.ForeignKey(User)
    album = models.ForeignKey(Album)
    owned = models.BooleanField()

    def __str__(self):
        return "%s's copy of %s" % (self.user.username, self.album.title)
