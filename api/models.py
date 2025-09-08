from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, name, role, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, role="admin", password=None, **extra_fields):
        user = self.create_user(email, name, role, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("therapist", "Therapist"),
        ("patient", "Patient"),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    picture = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    class Meta:
        db_table = "users"

    def __str__(self):
        return f"{self.name}"  # يظهر الاسم والايميل في الادمن


class Therapists(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    cv_url = models.CharField(max_length=255)
    major = models.CharField(max_length=255)
    bio = models.TextField()
    is_accepting_new_cli = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)
    approved_at = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "therapists"

    def __str__(self):
        return f"{self.user.name} - {self.major}"  # يظهر اسم المعالج والتخصص


class AvailabilitySlots(models.Model):
    therapist = models.ForeignKey(Therapists, on_delete=models.CASCADE)
    day_of_week = models.BigIntegerField()
    start_time = models.DateField()
    end_time = models.DateField()

    class Meta:
        db_table = "availability_slots"

    def __str__(self):
        return f"{self.therapist.user.name} - Day {self.day_of_week}"  # يظهر اسم المعالج واليوم


class Appointments(models.Model):
    therapist = models.ForeignKey(Therapists, on_delete=models.CASCADE)
    patient = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="appointments_as_patient")
    slot = models.ForeignKey(AvailabilitySlots, on_delete=models.CASCADE)
    scheduled_at = models.DateField()
    duration_minutes = models.BigIntegerField()
    status = models.CharField(max_length=50)
    meeting_link = models.CharField(max_length=255)
    notes = models.TextField()

    class Meta:
        db_table = "appointments"

    def __str__(self):
        return f"Appointment: {self.patient.name} with {self.therapist.user.name} on {self.scheduled_at}"


class Payments(models.Model):
    appointment = models.OneToOneField(Appointments, on_delete=models.CASCADE)
    amount = models.BigIntegerField()
    transaction_id = models.BigIntegerField()
    status = models.CharField(max_length=50)

    class Meta:
        db_table = "payments"

    def __str__(self):
        return f"Payment {self.id} - {self.status} for {self.appointment}"

