import { register } from '../../tools/api.js'
import { page } from '../../src/lib.js';
import { navUpdate } from '../../tools/updateNav.js';


export async function reg(event) {
    event.preventDefault();

    let formElem = document.querySelector('form')
    let data = new FormData(formElem);
    let email = data.get('email');
    let password = data.get('password');
    let rePass = data.get('rePass')



    if (email.trim() != '' && password.trim() != '' && rePass == password) {
        await register({ email: email, password: password });
        formElem.reset();
        page.redirect('/dashboard')
        navUpdate();
    } else {
        alert('All fields required!')
    }
}