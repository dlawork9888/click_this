# count_clicks/serializers.py

from rest_framework import serializers # serializer import from rest_framework
from .models import ClickModel # models.py에서 Click 모델 클래스 import

class ClickSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClickModel
        fields = ['count_id', 'clicked_date'] 
