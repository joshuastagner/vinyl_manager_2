from rest_framework import serializers
from albums.models import Album, Artist, Record

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('name')

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('title', 'artist', 'year')

class RecordSerializer(serializers.Serializer):
    artist = serializers.CharField(max_length=30)
    title = serializers.CharField(max_length=80)
    year = serializers.IntegerField()
    owned = serializers.BooleanField()
