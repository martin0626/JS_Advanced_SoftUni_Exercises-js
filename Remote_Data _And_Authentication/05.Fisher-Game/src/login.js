let loginForm = document.querySelector('form');
loginForm.addEventListener('submit', loginFunc);
document.querySelector('#logout').remove();

async function loginFunc(event) {
    event.preventDefault();
    let data = new FormData(loginForm);
    let email = data.get('email');
    let password = data.get('password');


    try {
        let loginPost = await fetch('http://localhost:3030/users/login', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (loginPost.ok != true) {
            throw Error();
        }

        let responseLogin = await loginPost.json();


        sessionStorage.setItem('userData', JSON.stringify({
            email: responseLogin.email,
            id: responseLogin._id,
            token: responseLogin.accessToken,
            username: responseLogin.username
        }))
        window.location = './index.html'

    } catch (error) {
        document.querySelector('.notification').textContent = 'Invalid Email or Password!'
    }



}