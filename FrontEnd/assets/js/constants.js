/* CONSTANTS */
const HTTP_VERB = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};
const API_BASE_URL = "http://localhost:5678/api";
const ENDPOINTS = {
  WORKS: `${API_BASE_URL}/works`,
  LOGIN: `${API_BASE_URL}/users/login`,
};
const WORK_CATEGORY = {
  ALL: 0,
  OBJECT: 1,
  APARTMENTS: 2,
  HOSTELS_APARTMENTS: 3,
};

/* UTILS */
const getApiData = async (url, method, headers, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    alert(error.message);
  }
};
