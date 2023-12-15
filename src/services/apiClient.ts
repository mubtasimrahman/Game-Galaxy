import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "./services/Reviews",
});
