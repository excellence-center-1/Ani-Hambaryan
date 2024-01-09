
# test_auth.py
import requests
import pytest

auth_api_endpoint = 'http://localhost:5000/auth'
jwt_token = None


@pytest.mark.auth
@pytest.mark.register
def test_user_registration():
    registration_data = {
        'name': 'test1',
        'email': 'test20@mail.ru',
        'password': 'password123'
    }
    registration_response = requests.post(f'{auth_api_endpoint}/registration', json=registration_data)
    assert registration_response.status_code == 201, f"the status code must be 201 but it is {registration_response.status_code }"

@pytest.mark.auth
@pytest.mark.login
def test_user_login():
    global jwt_token
    login_data = {
        'email': 'test20@mail.ru',
        'password': 'password123'
    }
    login_response = requests.post(f'{auth_api_endpoint}/login', json=login_data)
    
    assert login_response.status_code == 200, f"the status code must be 200 but it is {rlogin_response.status_code }"

    jwt_token = login_response.json().get('token')
    assert jwt_token is not None
    print(jwt_token)

@pytest.fixture(scope="module")
def get_headers():
    assert jwt_token is not None 
    headers = {
        'Authorization': f'Bearer {jwt_token}',
        'Content-Type': 'application/json'
    }
    return headers


