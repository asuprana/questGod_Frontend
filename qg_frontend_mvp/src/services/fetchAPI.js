import axios from 'axios';

const baseUrl = 'http://questgod-api.herokuapp.com';
// const baseUrl = 'http://localhost:8080';
const apiVersion = 'restapi_0';

export function authenticate( email, password ) {
    return fetch(`${baseUrl}/${apiVersion}/auth/authentication`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
    })
    .then( res => {
        console.log(res);
        return res.json();
    })
}

export function register( path, email, password ) {
    return fetch(`${baseUrl}/${apiVersion}/${path}`,     {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }
    )
}

export function postData( path, auth, body ) {
    
    const Obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${auth}`
        },
        body: JSON.stringify(body)
    };
    return fetch(`${baseUrl}/${apiVersion}/${path}`, Obj)
    .then(res => {
        console.log(res);
        return res.json();
    })
}

export function getData( path, auth ) {
    
    const Obj = {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${auth}`,
            'Content-Type': 'application/json',
        },
    };
    return fetch(`${baseUrl}/${apiVersion}/${path}`, Obj)
        .then(res => {
            console.log(res);
            return res.json();
        })  
}

export function updateData( path, auth, body) {

    const Obj = {
        method: 'PUT',
        headers: {
            'Authorization': `bearer ${auth}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }

    return fetch(`${baseUrl}/${apiVersion}/${path}`, Obj)
        .then(res => {
            console.log(res);
            return res.json();
        })
}