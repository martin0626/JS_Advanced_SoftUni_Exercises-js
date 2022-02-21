import { navigate } from "./tools/navigation.js";
import { addBoards } from "./views/dashView.js";
import { detailsShow } from "./views/detailsView.js";
import { getStarted } from "./views/homeView.js";
import { loginrForm } from "./views/loginView.js";
import { createPost } from "./views/newPostView.js";
import { registerForm } from "./views/registerView.js";
import { showView } from "./views/showView.js";


// const views = {
//     home: showHome,
//     register: showRegister,
//     login: showLogin,
//     "dashboard-holder": showDash,
//     details: showDetails,
//     createPost: showPostCreator
// }
loginrForm();
registerForm()
navigate();
showView('home');
// addBoards();
getStarted();
detailsShow();
createPost()