import { render, html } from "../src/lib.js"
import {get } from "../tools/api.js";
import { userData } from "../tools/validation.js";


let detailTemp = (furn) => html `
    <div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${furn.img.includes('./images')? '.' + furn.img: furn.img}" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${furn.make}</span></p>
            <p>Model: <span>${furn.model}</span></p>
            <p>Year: <span>${furn.year}</span></p>
            <p>Description: <span>${furn.description}</span></p>
            <p>Price: <span>${furn.price}</span></p>
            ${furn.material.trim() != ""
            ? html`
            <p>Material: <span>${furn.material}</span></p>
            `
            :'' 
        }
            
            <div>
            ${furn._ownerId == userData().user_id
                ?html`
                <a href=${'/edit/' + furn._id} class="btn btn-info">Edit</a>
                <a href=${'/delete/' + furn._id} class="btn btn-red">Delete</a>
                `
                :''
        }
                
            </div>
        </div>
    </div>
</div>
`

userData
export async function details(ctx) {
    const movieId = ctx.params.id;
    let furn = await get('/data/catalog/' + movieId)
    render(detailTemp(furn), document.querySelector('body'))
}