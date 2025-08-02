from django.contrib import admin
from .models import IPO

@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'issue_date', 'price', 'lot_size', 'status')
