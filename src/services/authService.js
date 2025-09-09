const TOKEN_KEY = "whoopchat_token"; // 🔑 fix pakai key konsisten

// Ambil token dari localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Simpan token
export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Hapus token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Validasi token JWT
export const isValidToken = (token) => {
  if (!token) return false;

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return false;

    // Decode payload
    const payload = JSON.parse(atob(base64Url));

    // Kalau ga ada exp → invalid
    if (!payload.exp) return false;

    const isExpired = payload.exp < Math.floor(Date.now() / 1000);

    if (isExpired) {
      removeToken();
      return false;
    }

    return true;
  } catch (err) {
    console.error("Invalid token:", err);
    removeToken();
    return false;
  }
};
