from django.http import HttpRequest
from .models import Category, Country, Tag

def common(request: HttpRequest):

    # カテゴリーを取得
    cat_jpn_list = list(Category.objects.values_list('name', flat=True).order_by("id"))
    cat_eng_list = list(Category.objects.values_list('english_name', flat=True).order_by("id"))

    # カントリーを取得
    ctry_jpn_list = list(Country.objects.values_list('name', flat=True).order_by("id"))
    ctry_eng_list = list(Country.objects.values_list('english_name', flat=True).order_by("id"))

    # タグを取得
    tag_jpn_list = list(Tag.objects.values_list('name', flat=True).order_by("id"))
    if 'なし' in tag_jpn_list:
        tag_jpn_list.remove('なし')

    tag_eng_list = list(Tag.objects.values_list('english_name', flat=True).order_by("id"))
    if 'None' in tag_eng_list:
      tag_eng_list.remove('None')

    #トップページカテゴリー
    cat_top_list = cat_eng_list.copy();
    cat_top_list.insert(0,'all')

    if 'blog' in cat_top_list:
      cat_top_list.remove('blog')

    return {
      "cat_jpn_list":cat_jpn_list,
      "cat_eng_list":cat_eng_list,
      "ctry_jpn_list":ctry_jpn_list,
      "ctry_eng_list":ctry_eng_list,
      "cat_top_list":cat_top_list,
      "tag_jpn_list":tag_jpn_list,
      "tag_eng_list":tag_eng_list,
    }