export async function apiGet(endpoint) {
  const response = await fetch(`https://mockapi.io/${endpoint}`);
  return response.json();
}

export async function apiPost(endpoint, data) {
  const response = await fetch(`https://mockapi.io/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}
