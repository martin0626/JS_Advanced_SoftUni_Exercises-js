import { html, render } from '../../node_modules/lit-html/lit-html.js';

let users = '';
let startTemplate = (data, matches) => html `
<tr class="${matches.includes(data._id)? 'select': ''}">
<td>${data.firstName} ${data.lastName}</td>
<td>${data.email}</td>
<td>${data.course}</td>
</tr>
`


function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);
    rend()

    function onClick() {
        let input = document.getElementById('searchField');
        let surchedText = input.value.toLowerCase();
        let foundedIds = []
        users.forEach(user => {
            let userInfo = Object.values(user).map(e => e.toLowerCase());
            if (userInfo.join(' ').includes(surchedText) && surchedText.trim() != '') {
                foundedIds.push(user._id);
            }
        });
        rend(foundedIds)
        input.value = ''
    }
}

async function rend(matches = []) {
    let res = await fetch('http://localhost:3030/jsonstore/advanced/table');
    users = Object.values(await res.json())
    render(users.map(user => startTemplate(user, matches)), document.querySelector('tbody'));
}


solve()