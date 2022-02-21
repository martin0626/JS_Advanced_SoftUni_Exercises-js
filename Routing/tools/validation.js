export function userData() {
    let user = sessionStorage.getItem('userInfo');
    return JSON.parse(user)
}