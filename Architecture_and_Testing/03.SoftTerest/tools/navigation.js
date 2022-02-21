import { showView } from "../views/showView.js";
import { logout } from "./api.js";

const views = {
    Home: 'home',
    Register: 'register',
    Login: 'login',
    Dashboard: 'dashboard-holder',
    Create: 'createPost',
    Logout: logout
}

export function navigate() {
    let navigationElem = document.querySelector('nav');
    navigationElem.addEventListener('click', navAction);
}


function navAction(event) {
    event.preventDefault();
    let currentElem = event.target;

    if (currentElem.tagName == "IMG") {
        showView(views.Home);
    } else if (views.hasOwnProperty(currentElem.textContent)) {
        if (typeof views[currentElem.textContent] == 'function') {
            typeof views[currentElem.textContent]()
        } else {
            showView(views[currentElem.textContent]);
        }

    }
}