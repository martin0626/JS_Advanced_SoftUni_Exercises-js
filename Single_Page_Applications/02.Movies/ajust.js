export function clearView() {
    Array.from(document.querySelectorAll('section,h1')).forEach(el => el.style.display = 'none');
}


export function checkStatus() {
    let movieAddBtn = document.getElementById('home-page-btn');
    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    let registerBtn = document.querySelector('nav li:nth-of-type(4)');
    let loginBtn = document.querySelector('nav li:nth-of-type(3)');
    let text = document.querySelector('nav li:nth-of-type(1) a');
    let logoutBtn = document.querySelector('nav li:nth-of-type(2)');


    if (user != null) {
        registerBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        text.textContent = `Welcome ${user.email}`
        logoutBtn.style.display = 'block';
        movieAddBtn.style.display = 'block'


    } else {
        registerBtn.style.display = 'block';
        loginBtn.style.display = 'block';
        text.textContent = `Welcome!`
        logoutBtn.style.display = 'none';
        movieAddBtn.style.display = 'none'

    }
}