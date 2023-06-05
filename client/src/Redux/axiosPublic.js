import axios from "axios";
import { BASEURL } from "../constants/baseURL";

export const axiosPublic = axios.create({
  baseURL: `${BASEURL}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
