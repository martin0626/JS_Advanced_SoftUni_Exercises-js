export function status() {
    let user = sessionStorage.getItem('userInfo');

    if (user != null) {
        let elementsHide = document.getElementsByClassName('guest');
        Array.from(document.getElementsByClassName('guest')).forEach(el => el.style.display = 'none');
        Array.from(document.getElementsByClassName('user')).forEach(el => el.style.display = 'block');
    } else {
        Array.from(document.getElementsByClassName('guest')).forEach(el => el.style.display = 'block');
        Array.from(document.getElementsByClassName('user')).forEach(el => el.style.display = 'none');
    }
}

export function userData() {
    return JSON.parse(sessionStorage.getItem('userInfo'))
}