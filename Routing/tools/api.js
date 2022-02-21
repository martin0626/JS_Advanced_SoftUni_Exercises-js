const host = 'http://localhost:3030'

async function requests(url, options) {

    try {
        let res = await fetch(host + url, options)

        if (!res.ok) {
            if (res.status == 403) {
                sessionStorage.removeItem('userData');
            }
            let error = await res.json()
            throw new Error(error.message)
        }

        if (res.status == 204) {
            return res;
        } else {
            let result = await res.json();
            return result
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }

}

function createOptions(method = 'GET', data) {
    let options = {
        method: method,
        headers: {}
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let user = JSON.parse(sessionStorage.getItem('userInfo'));

    if (user != null) {
        options.headers['X-Authorization'] = user.token;
    }

    return options
}


export function post(info, url) {
    let options = createOptions('POST', info)
    return requests(url, options);
}

export function get(url) {
    let options = createOptions()
    return requests(url, options)

}

export function del(url) {
    let options = createOptions('DELETE');
    requests(url, options);
}

export function put(info, url) {
    return requests(url, createOptions('PUT', info))
}


export async function register(data) {
    let result = await post(data, '/users/register');
    let user = JSON.stringify({
        email: result.email,
        token: result.accessToken,
        user_id: result._id
    })
    sessionStorage.setItem('userInfo', user);
}


export async function login(data) {
    let result = await post(data, '/users/login');
    let user = JSON.stringify({
        email: result.email,
        token: result.accessToken,
        user_id: result._id
    })
    sessionStorage.setItem('userInfo', user);
}

export async function logout() {
    get('/users/logout');
    sessionStorage.removeItem('userInfo');
    
}