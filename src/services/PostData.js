import axios from 'axios';

export function PostData(type, userData) {
    const BaseUrl = 'http://localhost:8080/restapi_0/';
    return new Promise((resolve, reject) => {
        axios.post(BaseUrl + type, userData)
            // .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
                console.log(responseJson);
            })
            .catch((error) => {
                reject(error)
                console.log(error);
            });
    });
}

export function GetData(type, userData) {
    const baseUrl = 'http://localhost:8080/restapi_0/';
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + type, userData)
            .then((responseJson) => {
                resolve(responseJson);
                // console.log(responseJson);
            })
            .catch((error) => {
                reject(error);
                // console.log(error);
            });
    });
}