import { html, render } from "../../node_modules/lit-html/lit-html.js";



let temp = (data) => html `
    <ul>
    ${data.map(city=> html`<li>${city}</li>`)}
    </ul>
`
export function renderTemplate(cities) {
    let result = temp(cities)
    render(result, document.getElementById('root'))
}

// .map(city=> `<li>${city}</li>`)