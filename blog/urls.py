from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.top_page, name='top_page'),
    path('about/', views.about, name='about'),
    path('post/<slug:slug>/', views.post_detail, name='post_detail'),
    path('<str:meta>/<str:name>/', views.post_list, name='post_list'),
    path('contact/form', views.contact_form, name='contact_form'),  # フォーム
    path('contact/complete/', views.complete, name='complete'),  # 完了画面
    path('search/', views.search, name='search'),


]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# """ 開発環境下のみ設定 """
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)