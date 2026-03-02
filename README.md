# 🚀 Task Manager AI - Guía de Estudio y Documentación

Este proyecto es un backend desarrollado con **Django REST Framework (DRF)** que utiliza Inteligencia Artificial para el desglose automático de tareas en subtareas. Está diseñado para ser escalable, seguro y fácil de replicar en cualquier entorno.

---

## 🏗️ Paso a Paso: Construcción del Proyecto

Esta sección documenta la lógica técnica aplicada durante el desarrollo para fines de aprendizaje.

### 1. Modelo de Datos Autorreferencial (`models.py`)
Para permitir que una tarea tenga "hijas" (subtareas), implementamos una relación de **Llave Foránea (ForeignKey)** hacia el mismo modelo (`self`).
* **`parent_task`**: Permite vincular una tarea a otra. Si este campo es `null`, la tarea es considerada "Principal".
* **`related_name='subtasks'`**: Este alias permite que, desde una tarea padre, podamos acceder a todas sus hijas fácilmente con `tarea.subtasks.all()`.

### 2. Serialización Recursiva (`serializers.py`)
Para que el Frontend reciba una tarea con todas sus subtareas anidadas en un solo JSON:
* Usamos un `SerializerMethodField` llamado `subtasks`.
* Creamos el método `get_subtasks` que llama al mismo `TaskSerializer`. Esto permite una estructura de árbol (recursividad).

### 3. Lógica de Negocio e IA (`views.py` & `service/`)
El corazón de la automatización reside en el método `perform_create` del ViewSet:
1. **Captura**: Interceptamos la creación de la tarea principal.
2. **Conexión con IA**: Enviamos el título y descripción al servicio `analyze_task_with_ai`.
3. **Automatización**: El servicio (actualmente con un **Mock** para desarrollo) devuelve categorías y una lista de subtareas.
4. **Persistencia**: El backend recorre esa lista y crea automáticamente objetos `Task` en la base de datos vinculados al ID del padre.

### 4. Seguridad y Variables de Entorno
* **Protección de Keys**: Se implementó el uso de un archivo `.env` para la `OPENAI_API_KEY` y la `SECRET_KEY` de Django.
* **Git Hygiene**: Se configuró un `.gitignore` estricto para evitar subir archivos sensibles o basura (`__pycache__`, `db.sqlite3`, `.env`) a GitHub.

---

## 💻 Cómo levantar el proyecto en otro computador

Sigue estos pasos exactos para replicar el entorno de desarrollo:

### 1. Clonar y Entrar al Proyecto
```bash
git clone [https://github.com/t0ofEr/tasks_test.git](https://github.com/t0ofEr/tasks_test.git)
cd tasks_test