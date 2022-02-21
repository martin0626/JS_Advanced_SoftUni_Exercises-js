function solve() {
    let formElement = document.getElementById('form')

    formElement.addEventListener('submit', submitFunc)

    function submitFunc(event) {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let firstName = data.get('firstName');
        let lastName = data.get('lastName');
        let number = data.get('facultyNumber');
        let grade = data.get('grade');

        if (firstName != '' && lastName != '' && number != '' && grade != '') {
            fetch('http://localhost:3030/jsonstore/collections/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "firstName": firstName,
                        "lastName": lastName,
                        "facultyNumber": number,
                        "grade": grade,
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }

        fetch('http://localhost:3030/jsonstore/collections/students')
            .then(res => res.json())
            .then(students => {
                let tableElement = document.querySelector('#results tbody');

                Array.from(tableElement.children).forEach(el => el.remove())
                Object.keys(students).forEach(key => {


                    let tableRow = document.createElement('tr')

                    let firstNameRow = document.createElement('th');
                    firstNameRow.textContent = students[key].firstName;
                    tableRow.appendChild(firstNameRow);


                    let lastNameRow = document.createElement('th');
                    lastNameRow.textContent = students[key].lastName;
                    tableRow.appendChild(lastNameRow);

                    let facultyNumberRow = document.createElement('th');
                    facultyNumberRow.textContent = students[key].facultyNumber;
                    tableRow.appendChild(facultyNumberRow);

                    let gradeRow = document.createElement('th');
                    gradeRow.textContent = students[key].grade;
                    tableRow.appendChild(gradeRow);

                    tableElement.appendChild(tableRow)

                })
            }).catch(error => {
                console.log(error);
            })

        formElement.reset();
    }
}


solve()