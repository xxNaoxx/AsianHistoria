from django.db.models.fields import NullBooleanField
from django.shortcuts import render, get_object_or_404,redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import Http404, HttpResponse
from django.conf import settings
from django.core.mail import BadHeaderError, EmailMessage
from django.db.models import Q # 検索機能のために追加
from django.contrib import messages
from .forms import ContactForm
from .models import Category, Country, Tag, Post
from functools import reduce
from operator import and_
import textwrap

# カテゴリーを取得
cat_jpn_list = list(Category.objects.values_list('name', flat=True).order_by("id"))
cat_eng_list = list(Category.objects.values_list('english_name', flat=True).order_by("id"))

#全カテゴリーを取得
cat_all_list = cat_eng_list.copy();
cat_all_list.insert(0,'all')

# カントリーを取得
ctry_jpn_list = list(Country.objects.values_list('name', flat=True).order_by("id"))
ctry_eng_list = list(Country.objects.values_list('english_name', flat=True).order_by("id"))

# タグを取得
tag_jpn_list = list(Tag.objects.values_list('name', flat=True).order_by("id"))
tag_eng_list = list(Tag.objects.values_list('english_name', flat=True).order_by("id"))

# ページネーション
def paginate_queryset(request, queryset, count):
    paginator = Paginator(queryset, count)
    page = request.GET.get('page')
    try:
        page_obj = paginator.page(page)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    return page_obj

# トップページ
def top_page(request):
    top_articles =  Post.objects.filter(is_public = True, is_top = True).order_by('created_date').reverse()[:3]
    posts = Post.objects.filter(is_public = True).exclude(category__name = '日常ブログ').order_by('created_date').reverse()[:4]

    all_articles = [posts]

    for i in range(len(cat_jpn_list)):
        all_articles.append(Post.objects.filter(is_public = True, category__name = cat_jpn_list[i]).order_by('created_date').reverse()[:4])

    blogs =  Post.objects.filter(is_public = True, category__name = '日常ブログ').order_by('created_date').reverse()[:4]

    return render(request, 'blog/top_page.html',
                 {'top_articles':top_articles,
                  'all_articles':all_articles,
                  'blogs':blogs
                 })

# 記事詳細ページ
def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    cat_eng = Category.objects.get(name = post.category).english_name
    ctry_eng = ''

    if post.country:
        ctry_eng = Country.objects.get(name = post.country).english_name

    tags = list(post.tag.all().exclude(name = 'なし').values_list('name', flat=True))
    tags_eng = []

    for tag in tags:
        tags_eng.append(Tag.objects.get(name = tag).english_name)

    context = {
        'post': post,
        'cat_eng': cat_eng,
        'ctry_eng':ctry_eng,
        'tags_eng':tags_eng
    }

    return render(request, 'blog/post_detail.html', context)

# 投稿一覧ページ
def post_list(request, name, meta):
    if name in cat_jpn_list:
       name = Category.objects.get(name = name).english_name
    elif name in ctry_jpn_list:
        name = Country.objects.get(name = name).english_name
    else:
        name = name

    # posts = []

    if name in cat_all_list:
        if name == 'all':
            posts = Post.objects.filter(is_public = True).exclude(category__name = '日常ブログ').order_by('created_date').reverse()
        else:
            cat_name = Category.objects.get(english_name = name).name
            posts = Post.objects.filter(is_public = True, category__name = cat_name).order_by('created_date').reverse()
        meta = 'category'
    elif name in ctry_eng_list:
        ctry_name = Country.objects.get(english_name = name).name
        posts = Post.objects.filter(is_public = True, country__name = ctry_name).order_by('created_date').reverse()
        meta = 'country'
    elif name in tag_eng_list:
        tag_name = Tag.objects.get(english_name = name).name
        posts = Post.objects.filter(is_public = True, tag__name = tag_name).order_by('created_date').reverse()
        meta = 'tag'
    else:
        # pass
        posts = []

    page_obj = paginate_queryset(request, posts, 3)
    context = {
        'posts': page_obj.object_list,
        'page_obj': page_obj,
        'meta':meta
    }

    return render(request, 'blog/post_list.html',context)

# お問い合わせフォーム画面
def contact_form(request):

    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            name = form.cleaned_data['name']
            subject = "Asian Historiaへのお問い合わせ"
            message = form.cleaned_data['message']
            email = form.cleaned_data['email']
            check = form.cleaned_data['check']
            to_list = [email]
            bcc_list = [settings.EMAIL_HOST_USER]
            content = textwrap.dedent('''
                 ※このメールはシステムからの自動返信です。

                {name} 様

                お問い合わせありがとうございます。
                以下の内容でお問い合わせを受け付けました。
                内容を確認させていただき、ご返信させていただきます。

                ----------------------------------

                ・お名前
                {name}

                ・メールアドレス
                {email}

                ・メッセージ
                {message}


                ----------------------------------
                ※個人ブログのため、返信にお時間を頂戴する場合があります。

                Asian Historia
                Nao
            ''').format(
                name=name,
                email=email,
                message=message
                )

            try:
                sendMessage = EmailMessage(subject=subject, body=content, to=to_list, bcc=bcc_list)
                sendMessage.send()
            except BadHeaderError:
                return HttpResponse('無効なヘッダーが見つかりました。')

            return redirect('complete')
    else:
        form = ContactForm()

    return render(request, 'blog/contact_form.html', {'form': form})

# 送信完了画面
def complete(request):
  return render(request, 'blog/contact_complete.html')

# aboutページ
def about(request):
  return render(request, 'blog/about.html')

# 検索結果ページ
def search(request):
    posts = Post.objects.filter(is_public = True).order_by('created_date')
    query = request.GET.get('q')

    # if query
    if query:
        # 除外リストを作成
        exclusion_list = set([' ', '　'])
        q_list = ''

        for i in query:
        # 全角半角の空文字が含まれていたら無視
            if i in exclusion_list:
                pass
            else:
                q_list += i

        query2 = reduce(
            and_, [Q(title__icontains=q) |
                   Q(content__icontains=q) for q in q_list]
        )

        posts = posts.filter(query2)
        posts_num = posts.count()

        messages.success(request, '「{}」の検索結果'.format(query))

    else:
        posts_num = 0

    page_obj = paginate_queryset(request, posts, 3)
    context = {
        'posts': page_obj.object_list,
        'page_obj': page_obj,
        'query': query,
        'posts_num': posts_num
    }
    return render(request, 'blog/search.html', context)
