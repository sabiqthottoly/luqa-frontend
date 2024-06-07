import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      let token = localStorage.getItem('accessToken');
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    } catch (err) {
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      return axiosInstance
        .post("/auth/refresh-token", { refreshToken })
        .then((res) => {
          if (res.status === 200) {
            // setTokenInLocalStorage(res.data.accessToken);
            localStorage.setItem('accessToken', res.data.tokens.accessToken);
            localStorage.setItem('refreshToken', res.data.tokens.refreshToken);
            // store.dispatch(signInSuccess());
            return axiosInstance(originalRequest);
          }
        });
    } else if (error.response.status === 403) {
      // removeUserFromLocalStorage();
      // store.dispatch(logoutSuccess());
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;