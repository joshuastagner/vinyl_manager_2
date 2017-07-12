from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from . import models
from albums.serializers import AlbumSerializer, ArtistSerializer, RecordSerializer
from rest_framework.decorators import api_view


def index(request):
    return render(request, 'albums/index.html')

def records(request):
    if request.method == 'GET':
        records = models.Record.objects.select_related('album').filter(user=request.user.id)
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

@api_view(['POST'])
def save_record(request):
    print(request.data)
    return Response(status=201)
