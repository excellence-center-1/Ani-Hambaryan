function getJwtTokenFromCookies() {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token=")); 

  if (cookieValue) {
    const token = cookieValue.split('=')[1];
    return token || null; 
  }

  return null; 
}

export { getJwtTokenFromCookies };
