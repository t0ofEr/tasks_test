from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    subtasks = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'category', 'parent_task', 'subtasks', 'created_at']

    def get_subtasks(self, obj):
        serializer = TaskSerializer(obj.subtasks.all(), many=True)
        return serializer.data