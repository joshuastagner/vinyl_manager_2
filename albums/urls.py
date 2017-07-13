from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'api/records', views.records, name='records'),
    url(r'^api/save-record', views.save_record, name='save-record'),
    url(r'^api/delete-record', views.delete_record, name='delete-record'),
]
