const userId = 123;
const response = await fetch(`https://SEU_ENDPOINT.mockapi.io/users`);
const data = await response.json();
console.log(data);
