# test_contactlist_api.py
import requests
import pytest
from test_auth import get_headers
from urllib.parse import quote




class Test_Contacts:
  contacts_api_endpoint  = 'http://localhost:5000/contacts'

  @pytest.mark.create
  def test_post_contact(self, get_headers):
      headers = get_headers 
      contact_data = {
          'contact': 'testContact',
          'email': 'testcontact@mail.ru',
          'phone': '+374 95 111114',
          'group': 'Work'
      }
      create_contact_response = requests.post(f'{self.contacts_api_endpoint}/create', json=contact_data, headers=headers)
      
      assert create_contact_response.status_code == 201, f"the status code must be 201 but it is {create_contact_response.status_code }"

  @pytest.mark.get_all_contacts
  def test_get_contacts(self, get_headers):
    headers = get_headers
    get_contacts_response = requests.get(f'{self.contacts_api_endpoint}', headers=headers)

    assert get_contacts_response.status_code == 200, f"the status code must be 200 but it is {get_contacts_response.status_code }"
    print (get_contacts_response.json())

  @pytest.mark.delete
  def test_delete_contact(self, get_headers):
      headers = get_headers 
      phone_number_to_delete = '+374 95 111117'
      encoded_phone_number = quote(phone_number_to_delete)

      delete_contact_response = requests.delete(f'{self.contacts_api_endpoint}/{encoded_phone_number}',  headers=headers)
      
      assert delete_contact_response.status_code == 200, f"the status code must be 201 but it is {delete_contact_response.status_code }"

      print(f"Contact with phone number {phone_number_to_delete} deleted successfully.")

      get_contacts_response = requests.get(f'{self.contacts_api_endpoint}', headers=headers)
      contacts = get_contacts_response.json()



class Test_Users:
  users_api_endpoint  = 'http://localhost:5000/users'
  
  @pytest.mark.get_all_users
  def test_get_users(self, get_headers):
    headers = get_headers
    get_users_response = requests.get(f'{self.users_api_endpoint}', headers=headers)

    assert get_users_response.status_code == 200, f"the status code must be 201 but it is {get_users_response.status_code }"
    print (get_users_response.json())

  @pytest.mark.get_user_info
  def test_get_info(self, get_headers):
    headers = get_headers
    get_info_response = requests.get(f'{self.users_api_endpoint}/info', headers=headers)

    assert get_info_response.status_code == 200, f"the status code must be 201 but it is {get_info_response.status_code }"
    print (get_info_response.json())


