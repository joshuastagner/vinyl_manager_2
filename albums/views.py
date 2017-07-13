from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from . import models
from albums.serializers import AlbumSerializer, ArtistSerializer, RecordSerializer
from rest_framework.decorators import api_view
import requests
import json
from vinyl_manager_2.settings import SECRETS


def index(request):
    return render(request, 'albums/index.html')

@api_view(['GET', 'POST'])
def records(request):
    if request.method == 'GET':
        user_records = models.Record.objects.select_related('album').filter(user=request.user.id)
        data = []

        for record in user_records:
            record_data = {
                'artist': record.album.artist,
                'title': record.album.title,
                'year': record.album.year,
                'owned': record.owned,
                'thumb': record.album.thumb
            }
            data.append(record_data)

        serializer = RecordSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        query = 'https://api.discogs.com/database/search?q=%s&key=%s&secret=%s' % (
            request.data['query'], SECRETS['DISCOGS']['KEY'], SECRETS['DISCOGS']['SECRET'])

        discogs_response = requests.get(query)
        data = json.loads(discogs_response.text)

        def transform_discog_object(obj):
            title = obj['title'].split('-')

            album_title = None
            try:
                album_title = title[1]
            except:
                album_title = 'unknown'

            year = None
            try:
                year = obj['year']
            except:
                year = None

            thumb = None
            try:
                thumb = obj['thumb']
            except:
                thumb = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/1200px-12in-Vinyl-LP-Record-Angle.jpg'

            return {
                'artist': obj['title'].split('-')[0],
                'title': album_title,
                'year': year,
                'thumb': thumb,
                'owned': False
                }

        data = map(transform_discog_object, data['results'])
        serializer = RecordSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def save_record(request):
    artist = models.Artist.objects.get_or_create(name=request.data['artist'])
    owned = request.data['owned'] == 'true'
    year = 9999 if request.data['year'] == None else request.data['year']

    album = models.Album.objects.get_or_create(
        artist=artist[0],
        title=request.data['title'],
        year=year,
        thumb=request.data['thumb'],
    )
    record = models.Record.objects.create(
        user_id=request.user.id,
        album=album[0],
        owned=owned
    )
    record.save()
    return Response(status=201)
