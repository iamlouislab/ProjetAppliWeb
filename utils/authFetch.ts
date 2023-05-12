// utils/authFetch.ts

export const authFetch = async (path: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
  
    const baseUrl = "http://localhost:8080/ProjetAppliWeb/rest/";
  
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  
    if (token) {
      headers = {
        ...headers,
        'Authorization': `Bearer ${token}`,
      };
    }
  
    const response = await fetch(baseUrl + path, {
      ...options,
      headers: headers,
    });
  
    if (response.status === 401) {
      // Handle unauthorized error, e.g., remove token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  
    return response;
  };
  