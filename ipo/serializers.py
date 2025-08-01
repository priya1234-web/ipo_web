from rest_framework import serializers
from django.contrib.auth.models import User
from .models import IPO


# IPO Serializer (already present)
class IPOSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPO
        fields = '__all__'


# User Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Creates user with hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
