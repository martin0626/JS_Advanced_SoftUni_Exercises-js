import { del } from "../../tools/api.js";
import { page } from '../../src/lib.js';

export async function delElem(ctx) {
    del(`/data/catalog/${ctx.params.id}`)
    page.redirect('/dashboard')
}