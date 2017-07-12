from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect, render
from . import forms
from albums.views import index

def signupView(request):
    if request.method == 'POST':
        form = forms.SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect(index)

    else:
        form = forms.SignUpForm()
        return render(request, 'signup.html', {'form': form})

def loginView(request):
    if request.method == 'POST':
        form = forms.LoginForm(data=request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            if username == '':
                user = authenticate(email=email, password=password)
            else:
                user = authenticate(username=username, password=password)

            login(request, user)

            return redirect(index)

        else:
            return render(request, 'login.html', {'form': form})
    else:
        form = forms.LoginForm()
        return render(request, 'login.html', {'form': form, 'error': form.error_messages})

def logoutView(request):
    logout(request)
    return HttpResponse('Logged out!')

