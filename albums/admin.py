from django.contrib import admin
from albums.models import Album, Artist, Record

class AlbumsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Album, AlbumsAdmin)
admin.site.register(Artist, AlbumsAdmin)
admin.site.register(Record, AlbumsAdmin)
