import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

function search() {
    onRender();
    document.querySelector('button').addEventListener('click', searchElem);

}


let templateCities = (data, citiesFind) => html `
<ul>${data.map(city=> html`<li class="${citiesFind.includes(city)? "active": ''}">${city}</li>`)}</ul>
`

let templateResult = (data)=> html`
${data.length > 0? html`<p>${data.length} matches found</p>`: ''}
`


search()

function onRender(townsIn=[]){
   let temp = templateCities(towns, townsIn);
   render(temp, document.getElementById('towns'));
   render(templateResult(townsIn), document.getElementById('result'))
   
}

function searchElem(){
   let input = document.getElementById('searchText').value;
   let townsFind = []

   towns.forEach(t=> {
      
      input = input.toLowerCase();
      if(t.toLowerCase().includes(input.trim()) && input.trim() != ''){
         townsFind.push(t);
      }
   })

   document.getElementById('searchText').value = '';
   onRender(townsFind);
}