const BASE_URL = "/api/users";

export async function signUp(userData) {
  console.log("Request data:", userData);

  const res = await fetch(BASE_URL + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  console.log("Response from backend:", res);
  if (res.ok) {
    // Extract the token from the response headers or body
    const token = res.headers.get("Authorization"); // Assuming token is sent in the Authorization header
    // const { token } = await res.json(); // Uncomment if token is sent in the response body
    console.log("Token:", token);
    return token;
  } else {
    console.log("Error in signup");
    throw new Error("Invalid Sign Up");
  }
  
export async function getUser(userId) {
  const res = await fetch(BASE_URL + "/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userId),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return res;
  }
}

export async function login(loginData) {
  const res = await fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return res;
  }
}
