from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

## https://docs.djangoproject.com/en/4.0/topics/auth/customizing/#a-full-example

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, date_of_birth, password=None):
        """
            Creates and saves a User in the DB
        """

        if not email:
            raise ValueError("User must have an email adress")

        user = self.model(
            # lowercasing the domain part
            email = self.normalize_email(email),
            date_of_birth = date_of_birth,
        )

        # Has the password
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, date_of_birth, password=None):
        """
            creates a superuser and saves it
        """

        user = self.create_user(email, date_of_birth=date_of_birth, password=password)

        user.is_admin = True
        ## The self._db argument is a reference to the database connection
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    ## verbose_name => name in the Admin page of Django of this data
    email = models.EmailField(
        verbose_name="email adress",
        max_length = 255,
        unique = True,
    )
    date_of_birth = models.DateField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)


    objects = UserManager()

    ## what are these field doing
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["date_of_birth"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
    # "Does the user have a specific permission?"
    # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        # "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        # "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
