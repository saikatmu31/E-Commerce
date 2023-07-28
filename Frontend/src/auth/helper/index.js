const { API } = require("../../Backend");

export const sendOtp = async (email) => {
  try {
    // console.log(email);
    const response = await fetch(`${API}auth/sendotp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    return response.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const signup = async (user) => {
  try {
    console.log(user);
    const response = await fetch(`${API}auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const signin = async (user) => {
  return fetch(`${API}auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const authenticate = async (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = async (next) => {
  if (window !== undefined) {
    localStorage.removeItem("jwt");
    next();
  }
};

export const isAuthenticated = async (data, next) => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
