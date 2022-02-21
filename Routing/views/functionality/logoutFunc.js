import { logout } from "../../tools/api.js";
import { page } from '../../src/lib.js'
import { navUpdate } from "../../tools/updateNav.js";

export async function loguotFunc() {
    await logout()
    page.redirect('/login')
    navUpdate();
}