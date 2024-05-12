from rest_framework import serializers
from users.models import CustomUser
from ..models import Ownership

# 花の贈呈者の情報を取得するためのシリアライザ
class UserColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "user_name", "color"]

# Ownership情報から贈呈者を割り出すためのシリアライザ
class PresentersSerializer(serializers.ModelSerializer):
    presenter = UserColorSerializer()
    
    class Meta:
        model = Ownership
        fields = ["id", "presenter"]

# 花の色を取得するためのシリアライザ
class GetFlowerColorSerializer(serializers.ModelSerializer):
    presenters = PresentersSerializer(many=True)
    
    class Meta:
        model = CustomUser
        fields = ["id", "presenters"]