# conftest.py
import pytest
import yaml

@pytest.fixture
def config():
    with open('config.yml', 'r') as file:
        config_data = yaml.safe_load(file)
    return config_data
