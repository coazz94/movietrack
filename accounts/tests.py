from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status


class AccountsTest(APITestCase):
    # Test manually if a user can be created
    def setUp(self):
        # We want to go ahead and originally create a user.
        self.test_user = User.objects.create_user(
            "testuser", "test@example.com", "testpassword"
        )

        # URL for creating an account.
        self.create_url = reverse("account-create")

    ## test if a user can be created via the post request and see the request data we get back
    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            "username": "foobar",
            "email": "foobar@example.com",
            "password": "somepassword",
        }

        response = self.client.post(self.create_url, data, format="json")

        # We want to make sure we have two users in the database..
        self.assertEqual(User.objects.count(), 2)
        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Additionally, we want to return the username and email upon successful creation.
        self.assertEqual(response.data["username"], data["username"])
        self.assertEqual(response.data["email"], data["email"])
        self.assertFalse("password" in response.data)

    def test_create_user_with_short_password(self):
        """
        Ensure user is not created for password lengths less than 8.
        """
        data = {
            "username": "foobar",
            "email": "foobarbaz@example.com",
            "password": "foo",
        }

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["password"]), 1)

    def test_create_user_with_no_password(self):
        data = {"username": "foobar", "email": "foobarbaz@example.com", "password": ""}

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["password"]), 1)

    def test_create_username_exists(self):
        """
        Ensure that a user with the same username doesn't exists already in the db
        """

        data = {
            "username": "testuser",
            "email": "xxxx@example.com",
            "password": "12345678",
        }

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_username_too_long(self):
        """
        Ensure that the username isn't too long, max_length is 10
        """
        data = {
            "username": "mickeymouse123",
            "email": "xxxx@hotmail.com",
            "password": "12345678",
        }

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_username_not_filled(self):
        """
        Ensure that a username must be provided
        """
        data = {
            "username": "",
            "email": "xxxx@hotmail.com",
            "password": "12345678",
        }

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_email_not_filled(self):
        """
        Ensure that a email must be provided
        """
        data = {
            "username": "coazz94",
            "email": "",
            "password": "12345678",
        }

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_email_exists(self):
        """
        Ensure that a user with the same email doesn't exists already in the db
        """

        data = {
            "username": "coazz94",
            "email": "test@example.com",
            "password": "12345678",
        }

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_mail_format(self):
        """
        Ensure that email has a valid format
        """

        data = {
            "username": "coazz94",
            "email": "testexample.com",
            "password": "12345678",
        }

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
