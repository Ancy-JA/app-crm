import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://vineoback-gh-qa.caprover2.innogenio.com", 
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
