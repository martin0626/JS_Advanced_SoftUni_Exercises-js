function solve() {
    let urlAddress = 'http://localhost:3030/jsonstore/bus/schedule/'
    let resultDisplayElement = document.getElementById('info');
    let currID = 'depot'

    function depart() {

        fetch(`${urlAddress}${currID}`)
            .then(res => res.json())
            .then(busStop => {
                resultDisplayElement.textContent = `Next stop ${busStop.name}`
                document.getElementById('depart').disabled = true;
                document.getElementById('arrive').disabled = false;
            }).catch(error => {
                resultDisplayElement.textContent = `Error`
                document.getElementById('depart').disabled = true;
                document.getElementById('arrive').disabled = true;
            })
    }

    function arrive() {

        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;

        fetch(`${urlAddress}${currID}`)
            .then(res => res.json())
            .then(busStop => {
                resultDisplayElement.textContent = `Arriving to ${busStop.name}`
                currID = busStop.next;
            }).catch(error => {
                resultDisplayElement.textContent = `Error`;
                document.getElementById('arrive').disabled = true;
                document.getElementById('depart').disabled = true;
            })
    }

    return {
        depart,
        arrive
    };
}

let result = solve();