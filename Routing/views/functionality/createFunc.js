import { post, put } from "../../tools/api.js";
import { userData } from "../../tools/validation.js";
import { page } from '../../src/lib.js'

export async function createNewFurn(event) {
    event.preventDefault();

    let make = document.getElementById('new-make')
    let model = document.getElementById('new-model')
    let year = document.getElementById('new-year')
    let price = document.getElementById('new-price')
    let image = document.getElementById('new-image')
    let description = document.getElementById('new-description')
    let material = document.getElementById('new-material')
    let isValid = true;

    if (make.value.length >= 4) {
        make.classList.add('is-valid')
    } else {
        make.classList.add('is-invalid')
        isValid = false;
    }

    if (model.value.length >= 4) {
        model.classList.add('is-valid')
    } else {
        model.classList.add('is-invalid')
        isValid = false;
    }

    if (year.value >= 1950 && year.value <= 2050) {
        year.classList.add('is-valid')
    } else {
        year.classList.add('is-invalid')
        isValid = false;
    }

    if (price.value.length > 0) {
        price.classList.add('is-valid')
    } else {
        price.classList.add('is-invalid')
        isValid = false;
    }

    if (image.value.length != '') {
        image.classList.add('is-valid')
    } else {
        image.classList.add('is-invalid')
        isValid = false;
    }

    if (description.value.length > 10) {
        description.classList.add('is-valid')
    } else {
        description.classList.add('is-invalid')
        isValid = false;
    }



    let info = {
        _ownerId: userData().user_id,
        make: make.value,
        model: model.value,
        year: year.value,
        description: description.value,
        material: material.value,
        price: price.value,
        img: image.value
    }

    if (isValid && event.target.value == 'Create') {
        post(info, '/data/catalog');
        page.redirect('/dashboard')
    } else if (isValid && event.target.value == 'Edit') {
        let id = event.target.id;
        await put(info, '/data/catalog/' + id);
        page.redirect('/dashboard')
    }
}