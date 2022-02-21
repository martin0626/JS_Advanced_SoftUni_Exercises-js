function attachEvents() {
    let author = document.querySelector('input[name="author"]');
    let message = document.querySelector('input[name="content"]');
    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', submit);
    refreshBtn.addEventListener('click', refresh);



    async function submit() {

        let postMessage = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'author': author.value,
                'content': message.value
            })
        })
        document.getElementById('messages').value += `\n${author.value}: ${message.value}`
        author.value = '';
        message.value = '';
    }

    async function refresh() {
        document.getElementById('messages').textContent = '';
        let res = await fetch('http://localhost:3030/jsonstore/messenger');
        let getAllMessages = await res.json();
        let messages = []
        Object.keys(getAllMessages).forEach(key => {
            messages.push(`${getAllMessages[key].author}: ${getAllMessages[key].content}`);
        })
        document.getElementById('messages').value = messages.join('\n')

    }
}
attachEvents();