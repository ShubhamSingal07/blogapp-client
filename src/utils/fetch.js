const API_URL = process.env.REACT_APP_API_URL;

export const customFetch = async ({ url, method = 'get', body, headers }) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}${url}`, {
    method,
    headers: { ...headers, 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    body: JSON.stringify(body),
  });
  return res.json();
};
