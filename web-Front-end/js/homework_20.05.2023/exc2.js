const correctUrl = 'https://jsonplaceholder.typicode.com';
const errorUrl = 'https://mocki.io/v1/6c1ad3f5-1b42-42c0-b';
const main_resolve = document.getElementById("main_resolve");
const main_reject = document.getElementById("main_reject");

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }, 1000);
  });
};

const fetchDataAsync = async (url) => {
  try {
    const queryId = new URLSearchParams(window.location.search).get('id');
    const queryUrl = queryId ? `${url}/users/${queryId}` : `${url}/users`;
    const users = await fetchData(queryUrl);
    console.log('Users:', users);
    main_resolve.innerHTML = JSON.stringify(users);
  } catch (error) {
    console.error(error);
    main_reject.innerHTML = 'Error: Failed to fetch user data';
  }
};

fetchDataAsync(correctUrl);
fetchDataAsync(errorUrl);
