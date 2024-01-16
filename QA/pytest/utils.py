# utils.py
import os
import yaml 

def get_token_from_file(file_path):
  with open(file_path, 'r') as file:
    token = file.read().strip()
  return token


def get_api_endpoint():
  config_path = os.path.join(os.path.dirname(__file__), 'config.yml')

  with open(config_path, 'r') as config_file:
      config_data = yaml.safe_load(config_file)
  api_endpoint = config_data.get('api_endpoint', '')
  return api_endpoint
