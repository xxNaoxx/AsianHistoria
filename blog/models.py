from django.conf import settings
from django.db import models
from django.utils import timezone

# カテゴリーモデル
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, null=True)
    english_name = models.CharField(max_length=50, unique=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# カントリーモデル
class Country(models.Model):
    name = models.CharField(max_length=50, unique=True)
    english_name = models.CharField(max_length=50, unique=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# タグモデル
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    english_name = models.CharField(max_length=50, unique=True, null=True)

    def __str__(self):
        return self.name

# ポストモデル
class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.PROTECT, null=True, blank=True)
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)
    content = models.TextField()
    slug = models.SlugField(null=False, unique=True)
    tag = models.ManyToManyField(Tag,)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(default=timezone.now)
    is_top = models.BooleanField('トップに表示する', default=False, help_text='トップに固定する場合はチェックを入れてください')
    is_public = models.BooleanField('公開する', default=False, help_text='公開する場合はチェックを入れてください')

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.created_date:
            self.created_date = timezone.now()
        self.updated_date = timezone.now()
        return super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

class blog_category(models.Model):
        name = models.CharField(max_length=50, unique=True)

