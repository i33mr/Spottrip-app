import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export default axios.create({
//   baseURL: "http://b5bb-95-185-49-60.ngrok.io",
// });

const instance = axios.create({
  baseURL: "http://ef98-2001-f40-935-492-70cd-9dd8-7fa2-beea.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
