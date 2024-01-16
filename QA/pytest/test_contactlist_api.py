# test_contactlist_api.py
import requests
import pytest
import yaml
from test_auth import get_headers
from urllib.parse import quote
from conftest import config




class Test_Contacts:
  contacts_api_endpoint = f'{config.get("api_endpoint")}/contacts'
  # @pytest.mark.create
  def test_post_valid_contact(self, get_headers):
      headers = get_headers 
      contact_data = {
          'contact': 'testContact',
          'email': 'testcontact@mail.ru',
          'phone': '+374 95 111114',
          'group': 'Work'
      }
      create_contact_response = requests.post(f'{self.contacts_api_endpoint}/create', json=contact_data, headers=headers)
      data = create_contact_response.json()
      assert create_contact_response.status_code == 201, f"the status code must be 201 but it is {create_contact_response.status_code }"
      assert "contact" in data, "Expected 'contact' key not found in the JSON response"
      assert "email" in data, "Expected 'email' key not found in the JSON response"
      assert "group" in data, "Expected 'group' key not found in the JSON response"
      assert isinstance(data["email"], str), "'email' value is not an string"
      assert create_contact_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + create_contact_response.headers.get("Content-Type")


  # @pytest.mark.create
  def test_post_invalid_contact(self, get_headers):
      headers = get_headers 
      contact_data = {
          'contact': 'testContact',
          'email': 'testcontact@mail.ru',
          'group': 'Work'
      }
      create_contact_response = requests.post(f'{self.contacts_api_endpoint}/create', json=contact_data, headers=headers)
      data = create_contact_response.json()
      assert create_contact_response.status_code == 500, f"the status code must be 500 but it is {create_contact_response.status_code }"
      assert data.get('message') == 'Internal server error', f"The response body must be 'Internal server error' but it is {data.get('message')}"
      assert "contact"  not in data, " 'contact' key is in the JSON response"
      assert "email"  not in data, " 'email' key is in the JSON response"
      assert "group"  not in data, " 'group' key is in the JSON response"
      assert create_contact_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + create_contact_response.headers.get("Content-Type") 
         

  @pytest.mark.create
  def test_post_contact_with_invalid_token(self, get_invalid_token):
      headers = {
        'Authorization': f'Bearer {get_invalid_token}',
        'Content-Type': 'application/json'
      }
      contact_data = {
          'contact': 'testContact',
          'email': 'testcontact@mail.ru',
          'phone': '+374 95 111114',
          'group': 'Work'
      }
      create_contact_response = requests.post(f'{self.contacts_api_endpoint}/create', json=contact_data, headers=headers)
      data = create_contact_response.json()
      assert create_contact_response.status_code == 401, f"the status code must be 401 but it is {create_contact_response.status_code }"
      assert create_contact_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + create_contact_response.headers.get("Content-Type")
      assert data.get('message') == 'Unauthorized user', f"The response status message must be 'Unauthorized user' but it is {data.get('message')}"


  @pytest.mark.get_all_contacts
  def test_get_contacts(self, get_headers):
    headers = get_headers
    get_contacts_response = requests.get(f'{self.contacts_api_endpoint}', headers=headers)
    data = get_contacts_response.json()
    assert get_contacts_response.status_code == 200, f"the status code must be 200 but it is {get_contacts_response.status_code }"
    assert isinstance(data, list), "Expected a list in the JSON response"
    for contact in data:
        assert isinstance(contact, dict), "Expected a dictionary for each contact"
        assert "contact" in contact, "Expected 'contact' key in contact dictionary"
        assert "phone_number" in contact, "Expected 'phone_number' key in contact dictionary"
        assert "group" in contact, "Expected 'group' key in contact dictionary"
        assert isinstance(contact["phone_number"], str), "'phone_number' value is not a string"

  @pytest.mark.get_all_contacts
  def test_invalid_url_statuscode(self):
    invalid_response = requests.get(self.contacts_api_endpoint + "1/non") 
    assert invalid_response.status_code == 404, "Expected a 404 status code, but got: " + str(invalid_response.status_code)

  
  @pytest.mark.delete
  def test_delete_valid_contact(self, get_headers):
      headers = get_headers 
      phone_number_to_delete = '+374 95 111114'
      encoded_phone_number = quote(phone_number_to_delete)

      delete_contact_response = requests.delete(f'{self.contacts_api_endpoint}/{encoded_phone_number}',  headers=headers)
      assert delete_contact_response.status_code == 200, f"the status code must be 201 but it is {delete_contact_response.status_code }"
      # get_contacts_response = requests.get(f'{self.contacts_api_endpoint}', headers=headers)
      # contacts = get_contacts_response.json()

  
  @pytest.mark.delete
  def test_delete_invalid_contact(self, get_headers):
      headers = get_headers 
      phone_number_to_delete = '+374'
      encoded_phone_number = quote(phone_number_to_delete)

      delete_contact_response = requests.delete(f'{self.contacts_api_endpoint}/{encoded_phone_number}',  headers=headers)
      assert delete_contact_response.status_code == 404, f"the status code must be 404 but it is {delete_contact_response.status_code }"



class Test_Users:
  users_api_endpoint  = '{config["api_endpoint"]}/users'
  
  @pytest.mark.get_all_users
  def test_get_users(self, get_headers):
    headers = get_headers
    get_users_response = requests.get(f'{self.users_api_endpoint}', headers=headers)
    data = get_users_response.json()
    assert get_users_response.status_code == 200, f"the status code must be 201 but it is {get_users_response.status_code }"
    assert isinstance(data, list), "Expected a list in the JSON response"
    for user in data:
        assert isinstance(user, dict), "Expected a dictionary for each user"
        assert "id" in user
        assert "name" in user, "Expected 'name' key in user dictionary"
        assert "email" in user, "Expected 'email' key in user dictionary"
        assert "password" in user, "Expected 'password' key in contact dictionary"
        assert isinstance(user["password"], str), "'password' value is not a string"
    assert get_users_response.headers.get("Content-Type") == "application/json; charset=utf-8", "Unexpected Content-Type: " + create_contact_response.headers.get("Content-Type")



  def test_handle_exception(self):
    try:
      response = requests.get(self.users_api_endpoint + "info?page=2")
      response.raise_for_status()
      print("Request successful")
    except requests.exceptions.RequestException as e:
      print("Request failed:", str(e))


