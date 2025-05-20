const API_BASE = "https://backtest.lucasbreda.me"; // Altere se necessário

// Função genérica para requisições à API
export async function apiRequest(endpoint, method = "GET", data = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const contentType = response.headers.get("content-type");
  let responseData = null;
  if (contentType && contentType.includes("application/json")) {
    responseData = await response.json();
  }
  if (!response.ok) {
    throw responseData || { message: "Erro desconhecido" };
  }
  return responseData;
}

// Exemplo de uso em um componente:
// import { apiRequest } from './api.js';
// const data = await apiRequest('/users/login', 'POST', { email, password });