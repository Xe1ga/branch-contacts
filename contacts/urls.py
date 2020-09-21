from django.conf.urls import url
from contacts import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^auth_login/$', views.auth_login, name='auth_login'),
    url(r'^auth_logout/$', views.auth_logout, name='auth_logout'),
    url(r'^contacts/$', views.get_branch_list, name='get_branch_list'),
    url(r'^contacts/save_changes/$', views.save_changes, name='save_changes'),
    url(r'^contacts/delete_organization/$', views.delete_organization, name='delete_organization'),
    url(r'^contacts/add_organization/$', views.add_organization, name='add_organization'),
    url(r'^contacts/map/$', views.get_map, name='get_map')
]
app_name = 'contacts'