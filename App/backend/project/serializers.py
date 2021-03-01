from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Areas, Brands, AreasBrands, Methods, Products, News, Images, Crops
from django.contrib.auth.models import User

class AreasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Areas
        fields = ('id', 'title', 'description', 'index')

class BrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brands
        fields = ('id', 'title', 'description', 'image')

class AreasBrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreasBrands
        fields = ('id', 'title', 'description', 'image', 'area', 'brand')

class MethodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Methods
        fields = ('id', 'title', 'description', 'image', 'areaBrand')

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('id', 'title', 'description', 'image', 'code', 'method')

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('id', 'title', 'description', 'shortDescription', 'importance', 'date')

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ('id', 'image', 'index', 'new')

class CustomImageSerializer(serializers.Serializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    image = serializers.ImageField(max_length=100, required=False)
    index = serializers.IntegerField()
    new = serializers.PrimaryKeyRelatedField(queryset=News.objects.all())
    width = serializers.IntegerField()
    height = serializers.IntegerField()

class CropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crops
        fields = ('id', 'point', 'image')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class UserLoginSerializer(serializers.Serializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = User.objects.get(pk=validated_data.username)
        if user.password == validated_data.password:
            print("si")
        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'password')
