from django.contrib import admin
from .models import Users, Therapists, AvailabilitySlots, Appointments, Payments

# Users admin
@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "role", "is_active", "is_staff")
    list_filter = ("role", "is_active", "is_staff")
    search_fields = ("name", "email", "phone")
    ordering = ("id",)

# Therapists admin
@admin.register(Therapists)
class TherapistsAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "major", "is_accepting_new_cli", "is_approved", "approved_at")
    list_filter = ("is_accepting_new_cli", "is_approved", "major")
    search_fields = ("user__name", "user__email", "major")
    ordering = ("id",)

# AvailabilitySlots admin
@admin.register(AvailabilitySlots)
class AvailabilitySlotsAdmin(admin.ModelAdmin):
    list_display = ("id", "therapist", "day_of_week", "start_time", "end_time")
    list_filter = ("day_of_week", "therapist")
    search_fields = ("therapist__user__name",)
    ordering = ("id",)

# Appointments admin
@admin.register(Appointments)
class AppointmentsAdmin(admin.ModelAdmin):
    list_display = ("id", "therapist", "patient", "slot", "scheduled_at", "duration_minutes", "status")
    list_filter = ("status", "scheduled_at", "therapist")
    search_fields = ("therapist__user__name", "patient__name", "slot__therapist__user__name")
    ordering = ("scheduled_at",)

# Payments admin
@admin.register(Payments)
class PaymentsAdmin(admin.ModelAdmin):
    list_display = ("id", "appointment", "amount", "transaction_id", "status")
    list_filter = ("status",)
    search_fields = ("appointment__therapist__user__name", "appointment__patient__name", "transaction_id")
    ordering = ("id",)
