function solve() {
    let formElement = document.querySelector('form');
    document.querySelector('#logout').remove();
    formElement.addEventListener('submit', registerPost);

    async function registerPost(event) {

        event.preventDefault();

        let data = new FormData(formElement);
        let email = data.get('email')
        let password = data.get('password')
        let repeat = data.get('rePass')
        let notification = document.getElementsByClassName('notification')[0]

        if (email == '') {
            notification.textContent = 'Invalid Email!';
            return
        } else if (password == '') {
            notification.textContent = 'Invalid Password!';
            return
        } else if (password != repeat) {
            notification.textContent = 'Password does\'t match!'
            return
        }
        try {
            let postRes = await fetch('http://localhost:3030/users/register', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            if (postRes.ok != true) {
                throw Error();
            }
            let result = await postRes.json();

            sessionStorage.setItem('userData', JSON.stringify({
                email: result.email,
                id: result._id,
                token: result.accessToken
            }))
            window.location = './index.html';

        } catch (error) {
            console.log(error);
            notification.textContent = 'Email already exist!';
        }
    }




}

solve()