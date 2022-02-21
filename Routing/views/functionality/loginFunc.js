import { login } from '../../tools/api.js'
import { page } from '../../src/lib.js';
import { navUpdate } from '../../tools/updateNav.js';


export async function logFunc(event) {
    event.preventDefault();

    let formElem = document.querySelector('form')
    let data = new FormData(formElem);
    let email = data.get('email');
    let password = data.get('password');

    if (email.trim() != '' && password.trim() != '') {
        await login({ email: email, password: password });
        formElem.reset();
        page.redirect('/dashboard')
        navUpdate();

    } else {
        alert('All fields are required!')
    }
}