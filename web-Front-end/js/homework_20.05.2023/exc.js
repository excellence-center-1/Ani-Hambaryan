const correctUrl = 'https://mocki.io/v1/6c1ad3f5-1b42-42c0-b43b-2a73f4dc8fe2';
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
        .then(servers => {
          resolve(servers);
        })
        .catch(error => {
          reject(error);
        });
    }, 1000);
  });
};

const fetchDataAsync = async (url) => {
  try {
    const servers = await fetchData(url);
    console.log('Servers:', servers);
    main_resolve.innerHTML = JSON.stringify(servers);
  } catch (error) {
    console.error(error);
    main_reject.innerHTML = 'Error: Failed to fetch data';
  }
};

fetchDataAsync(correctUrl);
fetchDataAsync(errorUrl);
