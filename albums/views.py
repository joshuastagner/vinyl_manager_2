from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from . import models
from albums.serializers import AlbumSerializer, ArtistSerializer, RecordSerializer
from rest_framework.decorators import api_view
import requests
from vinyl_manager_2.settings import SECRETS


def index(request):
    return render(request, 'albums/index.html')

@api_view(['GET', 'POST'])
def records(request):
    if request.method == 'GET':
        user_records = models.Record.objects.select_related('album').filter(user=request.user.id)
        data = []

        for record in records:
            record_data = {
                'artist': record.album.artist,
                'title': record.album.title,
                'year': record.album.year,
                'owned': record.owned
            }
            data.append(record_data)

        serializer = RecordSerializer(data, many=True)

        print(serializer.data)

        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        query = 'https://api.discogs.com/database/search?q=%s&key=%s&secret=%s' % (
            request.data['query'], SECRETS['DISCOGS']['KEY'], SECRETS['DISCOGS']['SECRET'])

        discogs_response = requests.get(query)
        return JsonResponse(discogs_response.json(), safe=False)

@api_view(['POST'])
def save_record(request):
    artist = models.Artist.objects.get_or_create(name=request.data['artist'])
    album = models.Album.objects.get_or_create(
        artist=artist[0],
        title=request.data['title'],
        year=request.data['year'],
    )
    record = models.Record.objects.create(
        user_id=request.user.id,
        album=album[0],
        owned=request.data['owned']
    )
    record.save()
    return Response(status=201)
