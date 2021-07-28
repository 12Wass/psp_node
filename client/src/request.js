import qs from 'qs';
import { SESSION_STATE_KEY } from './store';

function getToken() {
    const state = JSON.parse(localStorage.getItem(SESSION_STATE_KEY));
    let token = '';
    if (state && state.auth) {
        token = state.auth.token;
    };

    return token;
}

export const request = {
    post: (url, params = {}, headers = {}) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json',
            ...headers,
        },
    }).then(data => data.json()),
    get: (url, params = {}, headers = {}) => fetch(url, {
        method: 'GET',
        data: qs.stringify(params),
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            ...headers,
        },
    }).then(data => data.json()),
    delete: (url, params = {}, headers = {}) => fetch(url, {
        method: 'DELETE',
        data: qs.stringify(params),
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            ...headers,
        },
    }).then(data => data.json()),
    postImage: (url, body, headers = {}) => fetch(url, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            ...headers,
        },
    }).then(data => data.json()),
}