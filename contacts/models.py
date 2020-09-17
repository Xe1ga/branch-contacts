# -*- coding:utf-8 -*-
from django.db import models

# Create your models here.
class Branch(models.Model): 
    address = models.CharField(max_length = 250, verbose_name = 'Адрес филиала', blank = True)
    working_hours = models.CharField(max_length = 250, verbose_name = 'Время работы', blank = True)
    metro = models.CharField(max_length = 200, verbose_name = 'Метро', blank = True)
    phone_number = models.CharField(max_length = 250, verbose_name = 'Номер телефона', blank = True)
    holiday = models.BooleanField(verbose_name = 'Отпуск', default = False)
    coordinates = models.CharField(max_length = 250, verbose_name = 'Координаты', blank = True)
    
    def __str__(self):
        return "Филиал по адресу %s" % self.address 

    class Meta:
        ordering = ["address"]
        verbose_name = u"Филиал"
        verbose_name_plural = u"Филиалы"