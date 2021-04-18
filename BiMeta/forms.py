from django import forms
import re
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

class RegistrationForm(forms.Form):
    username = forms.CharField(label='Username', max_length=30)
    password1=forms.CharField(label='Password',widget=forms.PasswordInput())
    password2=forms.CharField(label='Type password again', widget=forms.PasswordInput())
    print(User.objects.count)
    def clean_password2(self):
        if 'password1' in self.cleaned_data:
            password1 = self.cleaned_data['password1']
            password2 = self.cleaned_data['password2']
            if password1==password2 and password1:
                return password2
        raise forms.ValidationError("Invalid Password")

    def clean_username(self):
        username = self.cleaned_data['username']
        if not re.search(r'^\w+$',username):
            raise forms.ValidationError("No special character in username allowed!")
        try:
            User.objects.get(username=username)
        except ObjectDoesNotExist:
            return username
        raise forms.ValidationError("User account existed")
    def save(self):
        User.objects.create_user(username=self.cleaned_data['username'],password=self.cleaned_data['password1'])