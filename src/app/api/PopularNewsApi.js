import axios from "axios";
import apiKey from "./api";

const popular = "popular";

const popularNewsApi = `https://newsapi.org/v2/everything?q=${popular}&apiKey=${apiKey}`;

const popularApi = axios.create({
    baseURL: popularNewsApi
})

export default popularApi;