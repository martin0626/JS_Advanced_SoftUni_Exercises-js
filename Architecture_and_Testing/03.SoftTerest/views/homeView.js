import { userData } from "../tools/checkStatus.js";
import { showView } from "./showView.js";

export function getStarted() {
    let button = document.querySelector('#home > div.bottom.text-center > a');
    button.addEventListener('click', start);

}

function start(event) {
    event.preventDefault();
    let user = userData()
    if (user == null) {
        showView('login');
    } else {
        showView('dashboard-holder');
    }
}