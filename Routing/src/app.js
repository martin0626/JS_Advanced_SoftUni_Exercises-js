import { navUpdate } from '../tools/updateNav.js'
import { createRend } from '../views/create.js'
import { dashRend } from '../views/dashboard.js'
import { details } from '../views/details.js'
import { edit } from '../views/edit.js'
import { delElem } from '../views/functionality/detailsFunc.js'
import { loguotFunc } from '../views/functionality/logoutFunc.js'
import { logRend } from '../views/login.js'
import { myFurn } from '../views/myFurn.js'
import { regRender } from '../views/register.js'
import { page } from './lib.js'

navUpdate()

page('/dashboard', dashRend)
page('/', '/dashboard')
page('/details/:id', details)
page('/create', createRend)
page('/edit/:id', edit)
page('/login', logRend)
page('/my-furniture', myFurn)
page('/register', regRender);
page('/logout', loguotFunc);
page('/delete/:id', delElem);

page.redirect('/dashboard');
page.start();