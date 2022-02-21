import {get } from "../tools/api.js";
import { userData } from "../tools/validation.js";
import { html, render } from "../src/lib.js"


let temp = (data) => html `
<div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
        ${data.map(furn=> html`
        <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${furn.img.includes('./images')? '.' + furn.img: furn.img}" />
                            <p>${furn.description}</p>
                            <footer>
                                <p>Price: <span>${furn.price}</span></p>
                            </footer>
                            <div>
                                <a href="/details/${furn._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
        `)} 
        </div>
    </div>
`



export async function myFurn() {
    const userId = userData().user_id;
    let furn = await get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
    render(temp(furn), document.querySelector('body'));
    
}