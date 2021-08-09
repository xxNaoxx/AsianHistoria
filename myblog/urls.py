from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('summernote/', include('django_summernote.urls')),
    path('', include('blog.urls')),
]

# from django.contrib import admin
# from django.urls import path, include

# from django.conf import settings
# from django.conf.urls.static import static
