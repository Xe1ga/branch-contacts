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
from django.conf import settings
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
    
    return render(request, 'contacts/table.html', locals())

# Сохранение изменений в таблице филиалов по контретной записи
@login_required(login_url='/')
def save_changes(request):
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

# Удаление записи из таблицы
@login_required(login_url='/')
def delete_organization(request):
   
    if request.method == 'POST':
        org = get_object_or_404(Branch, pk = request.POST.get('org_id'))
        org.delete()
    
        branchs = Branch.objects.all()
        return render(request, 'contacts/table.html', locals())
    return render(request, 'contacts/table.html', locals())


# Добавление записи в таблицу
@login_required(login_url='/')
def add_organization(request):
    if request.method == 'POST':
        if request.POST.get('addholiday') == "Да":
            holiday = True
        else:
            holiday = False
        org = Branch(address=request.POST.get('addaddress'), working_hours=request.POST.get('addworkinghours'), metro=request.POST.get('addmetro'), phone_number=request.POST.get('addphone'), holiday=holiday, coordinates=request.POST.get('addcoordinates'))
        org.save()
   
    return HttpResponseRedirect("/contacts/")

# Яндекс карта
@login_required(login_url='/')
def get_map(request):
    if request.method == 'GET':
        org = get_object_or_404(Branch, pk = request.GET.get('org_id'))
        coordinates = org.coordinates
        if coordinates:
            mlat = coordinates[1 : coordinates.find(",")]
            mlong = coordinates[coordinates.find(",") + 1 : len(coordinates) - 1]
            context = {
                "yandex_key": settings.YANDEX_KEY,
                "mlat": mlat,
                "mlong": mlong  
            }
            return render(request, 'contacts/map.html', context)
        else:
            return HttpResponseBadRequest("Отсутствуют или некорректно заданы координаты")           

      
        
        # context = {
        # "yandex_key": settings.YANDEX_KEY,
        # "coord": org.coordinates
            
        # }
        return org.coordinates
    

# @login_required(login_url='/')
# def get_map_point(request):
    
#     if request.method == 'POST':
#         org = get_object_or_404(Branch, pk = request.POST.get('org_id'))
#         context = {
#         "yandex_key": settings.YANDEX_KEY,
#         "coord": org.coordinates
            
#         }
#         return render(request, 'contacts/map.html', context)
#     return HttpResponseRedirect("/contacts/")

