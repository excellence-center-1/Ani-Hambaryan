# conftest.py
import pytest
import yaml
from token_reader import get_token_from_file
import os


@pytest.fixture
def get_invalid_token():
  return get_token_from_file('invalid_jwt_token.txt')

def load_config():
    config_path = os.path.join(os.path.dirname(__file__), "config.yml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

config = load_config()


