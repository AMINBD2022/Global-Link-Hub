import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://global-link-hub.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;

//http://localhost:5000

// https://global-link-hub.vercel.app
