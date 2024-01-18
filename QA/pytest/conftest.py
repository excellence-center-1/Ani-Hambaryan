# conftest.py
import pytest
import requests
import psycopg2
import allure
from utils import get_token_from_file, get_api_endpoint
from psycopg2 import sql


auth_api_endpoint = f"{get_api_endpoint()}/auth"

@allure.title("Prepare for the logging and logout")
@pytest.fixture(scope="session")
def logging():
  login_data = {
        'email': 'test20@mail.ru',
        'password': 'password123'
    }
  login_response = requests.post(f'{auth_api_endpoint}/login', json=login_data)

  if login_response.status_code != 200:
        raise RuntimeError(f"Login failed. Status code: {login_response.status_code}")
  else:
    print("---------------------------login successful")
  jwt_token = login_response.json().get('token')
  headers = {
      'Authorization': f'Bearer {jwt_token}',
      'Content-Type': 'application/json'
  }
  yield headers

  logout_response = requests.get(f'{auth_api_endpoint}/logout', headers=headers)
  if logout_response.status_code != 200:
        raise RuntimeError(f"Logout failed. Status code: {logout_response.status_code}")
  else:
    print("---------------------------logout successful")


@allure.title("Prepare for the connection to the db")
@pytest.fixture(scope = "session")
def database_connection():
  connection = psycopg2.connect(
    host="localhost",
    port=5432,
    user="examen1",
    password="123",
    database="examen_db1"
  )
  print("---------------------------db connection successful")
  yield connection
  connection.close()


@pytest.fixture
def get_invalid_token():
  return get_token_from_file('invalid_jwt_token.txt')