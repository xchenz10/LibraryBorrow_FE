import axios from "axios";

export async function getLoginToken(un, pw) {
  try {
    const res = await axios.post("http://16.170.226.98/django/api/v1/login", {
      username: String(un),
      password: pw,
    });
    const token = res.data.token;

    if (res.status === 200) {
      localStorage.setItem("token", token);
      return token;
    } else {
      return false;
    }
  } catch (error) {
    window.alert("Error at login");
  }
}


export async function validateToken() {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://16.170.226.98/django/api/v1/check-token", {
      headers: { Authorization: `token ${token}` },
    });
    if (res.status === 200) {
      console.log(res.data)
      const isSuperUser = res.data.is;
      localStorage.setItem('isSuperUser', isSuperUser)
      return res.data;
      
    } else {
      return false;
    }
  } catch (error) {
  }
}

export async function signup(un, pw, email) {
  const data = {
    username: un,
    password: pw,
    email: email,
  };
  try {
    const res = await axios.post("http://16.170.226.98/django/api/v1/sign-up", data);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      return res.data;
    } else {
      window.alert("Error signup");
      return false;
    }
  } catch (error) {
    window.alert("Error signup");
    return false
  }
}
