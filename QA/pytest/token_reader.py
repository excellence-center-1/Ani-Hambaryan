def get_token_from_file(file_path):
  with open(file_path, 'r') as file:
    token = file.read().strip()
  return token