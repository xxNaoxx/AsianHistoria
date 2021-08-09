from django import forms

class ContactForm(forms.Form):

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.label_suffix = " "

  # subject = forms.CharField(label='件名', max_length=100)
  name = forms.CharField(label='お名前', max_length=20)
  email = forms.EmailField(label='Email', help_text='※ご確認の上、正しく入力してください。')
  message = forms.CharField(label='メッセージ', widget=forms.Textarea)
  check = forms.BooleanField(label='上記の内容で送信します。よろしければチェックを入れて送信して下さい。',required=True)
