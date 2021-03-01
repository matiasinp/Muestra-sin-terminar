"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from project import views

router = routers.DefaultRouter()
router.register(r'areas', views.AreasView, 'area')
router.register(r'brands', views.BrandsView, 'brand')
router.register(r'areasBrands', views.AreasBrandsView, 'areaBrand')
router.register(r'methods', views.MethodsView, 'method')
router.register(r'products', views.ProductsView, 'product')
router.register(r'news', views.NewsView, 'new')
router.register(r'images', views.ImagesView, 'image')
router.register(r'crops', views.CropsView, 'crop')
router.register(r'users', views.UserView, 'user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/userLogin/', views.UserLogin.as_view()),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
