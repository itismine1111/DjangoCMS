from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


class MyUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not (username):
            raise ValueError("Username is a required Field")
        if not (email):
            raise ValueError("Email is a required field")
        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            username=username, email=self.normalize_email(email), password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)


class MyUser(AbstractBaseUser):
    username = models.CharField(
        verbose_name="Username", max_length=256, unique=True, null=False, blank=False
    )
    email = models.EmailField(
        verbose_name="Email", max_length=256, unique=True, null=False, blank=False
    )

    objects = MyUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email",]

    def __str__(self):
        return self.username
