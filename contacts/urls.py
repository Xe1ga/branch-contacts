from django.conf.urls import url
from contacts import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^auth_login/$', views.auth_login, name='auth_login'),
    url(r'^auth_logout/$', views.auth_logout, name='auth_logout'),
    url(r'^contacts/$', views.get_branch_list, name='get_branch_list')
]
app_name = 'contacts'