import axios from "axios";

export const signInService = async (username, password) => {
  console.log("username: " + username);
  try {
    const response = await axios.post("http://Localhost:8080/api/auth/signin", {
      username,
      password,
    });
    console.log("response.data: " + response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCandidatesService = async (token) => {
  console.log("token: " + token);
  try {
    const response = await axios.get("http://Localhost:8080/api/candidate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
