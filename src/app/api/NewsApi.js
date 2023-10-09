import axios, { Axios } from "axios"
import apiKey from "./api"


const trending = "india trending";


const topNewsApi = `https://newsapi.org/v2/everything?q=${trending}&apiKey=${apiKey}`;

const client = axios.create({
    baseURL: topNewsApi
})


export default client;


