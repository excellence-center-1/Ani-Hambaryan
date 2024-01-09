# test_smart_farm.py
import pytest
import requests


def test_api_with_jwt_token():
  
  jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6InlhMjkuYTBBZkJfYnlCUDFmRXphTWh1YjBPb215c1hNdnFCeVlpOHJQUl9ubnp3UmVGM01IZUtYOWtuQm5pX1g0N0F1RkJOQzVaMXZSbmRtVU9fWEc4aVI0TGljYmxPMlhySndrQzk2XzV4elFjbG8ydnpNOTNtSGF1a0lfMU9WZnp2QTdTeHdPak1RWllyWnoyelI2MDd1akkzQkVfRkdOb3ptUWtPTFp2bGFDZ1lLQVh3U0FSQVNGUUhHWDJNaUtzYS0tZGNOTDJpQ19WbWlWTzFvU1EwMTcxIiwiY3JlYXRlZCI6ZmFsc2UsImlhdCI6MTcwNDc0NTYzOSwiZXhwIjoxNzA1MzUwNDM5fQ.NN9DxpLf4kPd1dwOH85ycxQiwuwocT3kDv5xKedDw9A'
  
  headers = {
      'Authorization': f'Bearer {jwt_token}',
      'Content-Type': 'application/json'
  }

  api_endpoint = 'http://localhost:5000/community/users'
  response = requests.get(api_endpoint, headers=headers)
  assert response.status_code == 200, f"the status code must be 200 but it is {response.status_code}"

