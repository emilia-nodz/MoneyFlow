from rest_framework import serializers
from app.models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class IncomeSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all(),
        write_only=True
    )
    category = CategorySerializer(
        many=True,
        source='categories',
        read_only=True
    )
    class Meta:
        model = Income
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all(),
        write_only=True
    )
    category = CategorySerializer(
        many=True,
        source='categories',
        read_only=True
    )
    class Meta:
        model = Expense
        fields = '__all__'