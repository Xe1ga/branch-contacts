# -*- coding:utf-8 -*-
import os
import os.path
# import collections
# import copy
# import datetime
# import json
# import operator
# from contextlib import closing
# from cStringIO import StringIO
# from collections import Counter
# from collections import namedtuple
# import tempfile
# import xlsxwriter
# import appy.pod.renderer

from django import template
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import permission_required
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.contrib.auth.models import User
from django.core.cache import cache
from django.urls import reverse
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, StreamingHttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
# from django.template import RequestContext, loader
from django.utils import timezone
from django.views import generic
from django.views.generic import FormView, TemplateView

# from contacts.forms import LoginForm
from contacts.models import Branch

def index(request):
    
    return render(request, 'contacts/index.html', locals())

def auth_login(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
        if not request.user.is_authenticated:
            # login_form = LoginForm()
            context = {
                # 'form' : login_form,
                'error' : "Неверно введены имя пользователя и/или пароль. Попробуйте снова."
            }
            return render(request, 'contacts/index.html', context)

    return HttpResponseRedirect("/contacts/")

def auth_logout(request):
    logout(request)
    return render(request, 'contacts/index.html', locals())
    
# Получить таблицу филиалов
@login_required(login_url='/')
def get_branch_list(request):
    branchs = Branch.objects.all()
    # return render(request, 'contacts/table.html', locals())
    return render(request, 'contacts/table.html', locals())

# Сохранение изменений в таблице филиалов по контретной записи
@login_required(login_url='/')
def save_changes(request):
    print (request.POST)
    if request.method == 'POST':
        org = get_object_or_404(Branch, pk = request.POST.get('organizationid'))
        org.address = request.POST.get('address')
        org.working_hours = request.POST.get('workinghours')
        org.metro = request.POST.get('metro')
        org.phone_number = request.POST.get('phone')
        if request.POST.get('holiday') == "Да":
            org.holiday = True
        else:
            org.holiday = False
        org.coordinates = request.POST.get('coordinates')
        org.save()
   
    return HttpResponseRedirect("/contacts/")

        
    