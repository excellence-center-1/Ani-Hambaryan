
# test_auth.py
import requests
import pytest
import yaml
from faker import Faker
from conftest import config

jwt_token = None
fake = Faker()



auth_api_endpoint=f'{config.get("api_endpoint")}/auth'

@pytest.mark.auth
@pytest.mark.register
def test_valid_user_registration():
    valid_registration_data = {
        'name': 'test1',
        'email': fake.email(),
        'password': 'password123'
    }
    valid_registration_response = requests.post(f'{auth_api_endpoint}/registration', json=valid_registration_data)
    # print("Status Message:", valid_registration_response.text)
    assert valid_registration_response.status_code == 201, f"the status code must be 201 but it is {valid_registration_response.status_code }"
    assert valid_registration_response.json().get('message') == 'Registration successful', f"The response body must be 'Registration successful' but it is {valid_registration_response.json().get('message')}"
    assert valid_registration_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + valid_registration_response.headers.get("Content-Type")
    

@pytest.mark.invalid_data
@pytest.mark.register    
def test_invalid__user_registration():

    invalid_registration_data = {
        'name': 'test1',
        'password': 'password123'
    }

    invalid_response = requests.post(f'{auth_api_endpoint}/registration', json=invalid_registration_data)

    assert invalid_response.status_code == 500, f"the status code must be 500 but it is {invalid_response.status_code }"
    assert invalid_response.json().get('message') == 'error_registration', f"The response status message must be 'error_registration' but it is {invalid_response.json().get('message')}"
    assert invalid_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + invalid_response.headers.get("Content-Type")

@pytest.mark.invalid_data
@pytest.mark.register  
def test_existing__user_registration():

    existing_data = {
        'name': 'test1',
        'email': 'test20@mail.ru',
        'password': 'password123'
    }

    existing_data_response = requests.post(f'{auth_api_endpoint}/registration', json=existing_data)

    assert existing_data_response.status_code == 500, f"the status code must be 500 but it is {existing_data_response.status_code }"
    assert existing_data_response.json().get('message') == 'error_registration', f"The response status message must be 'error_registration' but it is {existing_data_response.json().get('message')}"
    assert existing_data_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + existing_data_response.headers.get("Content-Type")


@pytest.mark.auth
@pytest.mark.login
def test_valid_user_login():
    global jwt_token
    valid_login_data = {
        'email': 'test20@mail.ru',
        'password': 'password123'
    }
    valid_login_response = requests.post(f'{auth_api_endpoint}/login', json=valid_login_data)
    
    assert valid_login_response.status_code == 200, f"the status code must be 200 but it is {valid_login_response.status_code }"
    assert valid_login_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + valid_login_response.headers.get("Content-Type")
    assert valid_login_response.json().get('message') == 'Login successful', f"The response status message must be 'Login successful' but it is {valid_login_response.json().get('message')}"
    jwt_token = valid_login_response.json().get('token')
    assert jwt_token is not None, "The jwt token mustn't be None, but it is None"


# @pytest.mark.login
@pytest.mark.invalid_data
def test_invalid_user_login():
    global jwt_token
    invalid_login_data = {
        'email': 'test20000@mail.ru',
        'password': 'password123'
    }
    invalid_login_response = requests.post(f'{auth_api_endpoint}/login', json=invalid_login_data)
    
    assert invalid_login_response.status_code == 500, f"the status code must be 500 but it is {invalid_login_response.status_code }"
    assert invalid_login_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + invalid_login_response.headers.get("Content-Type")
    assert invalid_login_response.json().get('message') == 'error', f"The response status message must be 'error' but it is {invalid_login_response.json().get('message')}"
    jwt_token = invalid_login_response.json().get('token')
    assert jwt_token is  None, "The jwt token must be None, but it isn't None"

@pytest.fixture()
def get_headers():
    headers = {
        'Authorization': f'Bearer {jwt_token}',
        'Content-Type': 'application/json'
    }
    return headers


