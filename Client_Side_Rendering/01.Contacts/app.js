import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { contacts } from "./contacts.js"

let userView = (data, func) => html `
<div class="contact card">
<div>
    <i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
    <h2>Name: ${data.name}</h2>
    <button class="detailsBtn" @click="${func}">DETAILS</button>
    <div class="details" style="display: none;" id="${data.id}">
        <p>Phone number: ${data.phoneNumber}</p>
        <p>Email: ${data.email}</p>
    </div>
</div>
</div>
`

function start() {
    let parentElem = document.getElementById('contacts')
    render(contacts.map(d => userView(d, details)), parentElem)

    function details(event) {
        let detailsElem = event.target.parentNode.querySelector('.details');

        if (detailsElem.style.display == 'none') {
            detailsElem.style.display = 'block'
        } else {
            detailsElem.style.display = 'none'
        }
    }
}

start()