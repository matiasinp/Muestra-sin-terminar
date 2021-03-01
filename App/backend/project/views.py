from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, serializers, authentication, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.settings import api_settings
from .serializers import AreasSerializer, \
    BrandsSerializer, \
    AreasBrandsSerializer, \
    MethodsSerializer, \
    ProductsSerializer, \
    NewsSerializer, \
    ImagesSerializer, \
    CustomImageSerializer, \
    CropsSerializer, \
    UserSerializer
from .models import Areas, Brands, AreasBrands, Methods, Products, News, Images, Crops
from PIL import Image

class AreasView(viewsets.ModelViewSet):
    # authentication_classes = [authentication.TokenAuthentication]
    serializer_class = AreasSerializer
    queryset = Areas.objects.all()

class BrandsView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = BrandsSerializer
    queryset = Brands.objects.all()


class AreasBrandsView(viewsets.ModelViewSet):
    serializer_class = AreasBrandsSerializer
    queryset = AreasBrands.objects.all()

    # Rellena los campos no recibidos con los datos de Brands
    def create(self, request):
        columns = []
        if request.POST.get("title", "0") == '':
            columns.append('title')
        if request.POST.get("description", "0") == '':
            columns.append('description')
        if request.FILES.get("image", "0") == '0':
            columns.append('image')
        if request.POST.get("area", "0") == '':
            return Response(request, 400)
        if request.POST.get("brand", "0") == '':
            return Response(request, 400)

        if len(columns) > 0:
            row = Brands.objects.get_row(request.POST.get("brand", "0"), columns)
            title = request.POST.get("title", "0")
            description = request.POST.get("description", "0")
            image = request.FILES.get("image", "0")
            for i in range(0, len(row)):
                if columns[i] == 'title':
                    title = row[i]
                elif columns[i] == 'description':
                    description = row[i]
                elif columns[i] == 'image':
                    image = row[i]

            ab = AreasBrands.objects.create(title = title,
                description = description,
                image = image,
                area = Areas.objects.get(id=request.POST.get("area", "0")),
                brand = Brands.objects.get(id=request.POST.get("brand", "0")))
            ab.save()
            serializer = AreasBrandsSerializer(ab)
        return Response(serializer.data, 200)

class MethodsView(viewsets.ModelViewSet):
    serializer_class = MethodsSerializer
    queryset = Methods.objects.all()

    def list(self, request):
        fk = request.GET.get('fk')
        if not fk:
            methods = Methods.objects.all()
            serializer = MethodsSerializer(methods, many=True)
            return Response(serializer.data)
        else:
            methods = Methods.objects.filter(areaBrand__exact=fk)
            serializer = MethodsSerializer(methods, many=True)
            return Response(serializer.data)

class ProductsView(viewsets.ModelViewSet):
    serializer_class = ProductsSerializer
    queryset = Products.objects.all()

    def list(self, request):
        fk = request.GET.get('fk')
        if not fk:
            products = Products.objects.all()
            serializer = ProductsSerializer(products, many=True)
            return Response(serializer.data)
        else:
            products = Products.objects.filter(method__exact=fk)
            serializer = ProductsSerializer(products, many=True)
            return Response(serializer.data)


class NewsView(viewsets.ModelViewSet):
    serializer_class = NewsSerializer
    queryset = News.objects.all()

class ImagesView(viewsets.ModelViewSet):
    serializer_class = ImagesSerializer
    queryset = Images.objects.all()

    def list(self, request):
        queryset = Images.objects.all()

        for image in queryset:
            img = Image.open(image.image)
            image.width, image.height = img.size

        serializer = CustomImageSerializer(queryset, many=True)

        return Response(serializer.data)


class CropsView(viewsets.ModelViewSet):
    serializer_class = CropsSerializer
    queryset = Crops.objects.all()

class UserView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UserLogin(APIView):
    def post(self, request):
        permission_classes = (permissions.AllowAny,)
        try:
            user = User.objects.get(username=request.data["username"])
            if user.check_password(request.data["password"]):
                jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)

                response = Response(user.username, status=status.HTTP_200_OK)
                response.set_cookie(key="auth", value=token, httponly=True, samesite='Lax')
                return response
        except Exception as e:
            pass
        return Response(status=status.HTTP_401_UNAUTHORIZED)
