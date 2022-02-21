import { html, render } from "../../node_modules/lit-html/lit-html.js"


function addItem() {
    onRender()
    document.querySelector('input:nth-of-type(2)').addEventListener('click', postNewData);
}


let dropDownTemp = (text) => html `
<option>${text}</option>
`


async function onRender() {
    let options = Object.values(await getData());

    render(options.map(obj => dropDownTemp(obj.text)), document.getElementById('menu'))
}

async function getData() {
    let res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    return await res.json();
}

async function postNewData(event) {
    event.preventDefault();

    let newData = document.querySelector('#itemText').value;

    if (newData.trim() != '') {
        let res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newData
            })
        })

        onRender();
        document.querySelector('#itemText').value = ''
    }
}


addItem();