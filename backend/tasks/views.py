from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from .service.ai_service import analyze_task_with_ai

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.filter(parent_task__isnull=True) # Solo tareas principales
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save()

        if not task.parent_task:
            ai_results = analyze_task_with_ai(task.title, task.description)
            
            task.category = ai_results.get('category', 'General')
            task.save()

            subtasks_data = ai_results.get('subtasks', [])
            for sub_title in subtasks_data:
                Task.objects.create(
                    title=sub_title,
                    parent_task=task,
                    status='pending'
                )