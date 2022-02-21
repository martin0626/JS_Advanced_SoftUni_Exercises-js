function getInfo() {
    let input = document.getElementById('stopId');
    let stopName = document.getElementById('stopName');
    let buses = document.getElementById('buses');



    fetch(`http://localhost:3030/jsonstore/bus/businfo/${input.value}`)
        .then(res => { return res.json() })
        .then(stop => {
            Array.from(buses.querySelectorAll('li')).forEach(li => li.remove())
            stopName.textContent = stop.name;
            Object.keys(stop.buses).forEach(k => {
                let liElem = document.createElement('li');
                liElem.textContent = `Bus ${k} arrives in ${stop.buses[k]} minutes`
                buses.appendChild(liElem)
            })

        }).catch(error => {
            Array.from(buses.querySelectorAll('li')).forEach(li => li.remove())
            stopName.textContent = 'Error'
        })
    input.value = ''


}