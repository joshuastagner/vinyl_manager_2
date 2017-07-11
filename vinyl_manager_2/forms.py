from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.db.models import Q

class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=300, help_text='We won\'t send you anything')

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.fields['password1'].help_text = '8+ characters, Not all numbers'
        self.fields['password2'].help_text = ''
        self.fields['username'].help_text = ''


    class Meta:
        model = User
        fields = ['email', 'username', 'password1', 'password2']


class LoginForm(AuthenticationForm):
    email = forms.EmailField(max_length=300, required=False)

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.fields['username'] = forms.CharField(required=False)

    def is_valid(self):
        super(LoginForm, self).is_valid()

        try:
            user = User.objects.get(
                Q(username=self.cleaned_data['username']) | Q(email=self.cleaned_data['email'])
            )

        except:
            self._errors['no_user'] = 'User does not exist'
            return False

        if not check_password(self.cleaned_data['password'], user.password):
            self._errors['invalid password'] = 'Invalid Password'
            return False

        return True

    class Meta:
        fields = ['email', 'username', 'password']
