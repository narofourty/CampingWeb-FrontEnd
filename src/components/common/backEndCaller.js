const BASE_URL = 'http://localhost:8080';


async function callBackend(endpoint, method, payload, token) {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Token': token,
        },
    };

    if (payload && method !== 'GET') {
        options.body = JSON.stringify(payload);
    }

    return await fetch(`${BASE_URL}${endpoint}`, options);

}

async function callBackendFile(endpoint, method, formData, token) {
    const options = {
        method,
        headers: {
            'Token': token,
        },
    };

    if (formData && method !== 'GET') {
        options.body = formData;
    }

    return await fetch(`${BASE_URL}${endpoint}`, options);
}
