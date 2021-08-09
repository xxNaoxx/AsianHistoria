from django.contrib import admin
from .models import Category, Country, Tag, Post

from django_summernote.admin import SummernoteModelAdmin


class BlogAdmin(SummernoteModelAdmin):
    summernote_fields = '__all__'

admin.site.register(Post, BlogAdmin)
admin.site.register(Category)
admin.site.register(Country)
admin.site.register(Tag)



