import { checkStatus } from "./ajust.js";
import { load } from "./loadAllMovies.js";
import { showLogin } from "./login.js";


export async function logoutFunc() {
    let user = JSON.parse(sessionStorage.getItem('userInfo'));

    let logout = await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            "X-Authorization": user.token
        }
    })
    sessionStorage.removeItem('userInfo');
    checkStatus();
    showLogin()
}