import { html, render } from "../src/lib.js"
import {get } from "../tools/api.js"
import { userData } from "../tools/validation.js";


let templateDash = (data) => html `
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${data.map(f=> 
            html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${f.img}" />
                            <p>${f.description}</p>
                            <footer>
                                <p>Price: <span>${f.price} $</span></p>
                            </footer>
                            <div>
                            ${userData() != null
                                ?html`
                                <a href="/details/${f._id}" class="btn btn-info">Details</a>
                                `
                                :''
                            }
                                
                            </div>
                    </div>
                </div>
            </div>
            `
        )}
    </div>
</div>

`

export async function dashRend() {
    let allFurnitures = await get("/data/catalog");
    render(templateDash(allFurnitures), document.querySelector('body'))
}



{
    /* <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                        <img src="./images/chair.jpg" />
                        <p>Description here</p>
                        <footer>
                            <p>Price: <span>55 $</span></p>
                        </footer>
                        <div>
                            <a href="#" class="btn btn-info">Details</a>
                        </div>
                </div>
            </div>
        </div> */
}