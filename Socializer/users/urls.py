from . import views
from django.urls import path

urlpatterns = [
    path('signup', views.signup),
    path('login', views.login),
    path('test_token', views.test_token),
    path('logout', views.logout_view),
]
