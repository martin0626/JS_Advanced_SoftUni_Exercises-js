import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

let template = (data, func) => html `
<ul>${data.map(cat=> html` <li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn" @click="${func}">Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>`)}</ul>
`

function dataRender(){
    let temp = template(cats, showDetails)
    render(temp, document.getElementById('allCats'))
    function showDetails(event){
        let detailsElem = event.target.parentNode.querySelector('.status');
        let btn = event.target

        if(detailsElem.style.display == 'none'){
            detailsElem.style.display = 'block';
            btn.textContent = 'Hide status code'
        }else{
            detailsElem.style.display = 'none';
            btn.textContent = 'Show status code'


        }
    }
}

dataRender()