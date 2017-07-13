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
    thumb = models.CharField(default='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/1200px-12in-Vinyl-LP-Record-Angle.jpg', max_length=300)

    def __str__(self):
        return self.title

class Record(models.Model):
    user = models.ForeignKey(User)
    album = models.ForeignKey(Album)
    owned = models.BooleanField()

    def __str__(self):
        return "%s's copy of %s" % (self.user.username, self.album.title)
