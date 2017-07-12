from django.conf.urls import include, url
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^albums/', include('albums.urls')),
    url(r'^login/', views.loginView),
    url(r'^logout/', views.logoutView),
    url(r'^signup/', views.signupView),
]
