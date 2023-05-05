import axios from "axios";
import { successResponseType } from "./types";

interface bodyType {
    [key: string]: unknown;
}

const getFetch = (url:string, params?:bodyType)=> {
    return new Promise<successResponseType>((resolve, reject)=> {
        fetch(url, "GET", params)
        .then((response)=> {
            resolve(response.data)
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

function postFetch (url:string, body:any){
    return new Promise<successResponseType>((resolve, reject)=> {
        fetch(url, "POST", body)
        .then((response)=> resolve(response.data))
        .catch((error)=> {
            if(typeof(error.response.data) === 'object') {
                reject({
                    code: error.response.data.code?.toString(),
                    message: error.response.data.message?.toString(),
                })
            }
            if(typeof(error.response.data) === 'string') {
                reject({
                    message: "Hmm.. this request is not recognized, make sure you are accessing a valid url"
                })
            }
            reject({message: error.response.message})
        });
    });
}

export const patchFetch = (url:string, body:bodyType)=> {
    return new Promise((resolve, reject)=> {
        fetch(url, 'PATCH', body)
        .then((response)=> resolve(response.data))
        .catch((error)=> {
            if(typeof(error.response.data) === 'object') {
                reject({
                    code: error.response.data.code?.toString(),
                    message: error.response.data.message?.toString(),
                })
            }
            if(typeof(error.response.data) === 'string') {
                reject({
                    message: "Hmm.. this request is not recognized, make sure you are accessing a valid url"
                })
            }
            reject({message: error.response.message})
        });
    });
}

const fetch = (url:string, method:string, data?:bodyType)=> {
    return axios({
        url,
        method,
        baseURL: process.env.VITE_BASE_URL,
        data,
        withCredentials: true
    });
}

export { getFetch, postFetch }