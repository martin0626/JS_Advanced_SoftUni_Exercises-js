function attachEvents() {
    let selectionElement = document.getElementById('posts');
    let loadBtn = document.getElementById('btnLoadPosts');
    let viewBtn = document.getElementById('btnViewPost');

    let postsBody = document.getElementById('post-body');
    let commentsBody = document.getElementById('post-comments');

    loadBtn.addEventListener('click', load);
    viewBtn.addEventListener('click', view);

    function load() {
        Array.from(selectionElement.children).forEach(el => el.remove())
        async function infoLoad() {
            let res = await fetch('http://localhost:3030/jsonstore/blog/posts');
            let postsTitles = await res.json();

            Object.keys(postsTitles).forEach(key => {
                let option = document.createElement('option');
                option.id = postsTitles[key].id;
                option.textContent = postsTitles[key].title;
                selectionElement.appendChild(option);
            })
        }

        infoLoad();
    }

    function view() {

        Array.from(postsBody.children).forEach(el => el.remove());
        Array.from(commentsBody.children).forEach(el => el.remove());

        let currentSelection = selectionElement.options[selectionElement.selectedIndex];
        let id = currentSelection.id;
        let name = currentSelection.textContent;
        document.getElementById('post-title').textContent = name.toUpperCase();

        let resultParagraph = document.createElement('p');
        resultParagraph.className = 'post-body';

        (async() => {
            let res = await fetch(`http://localhost:3030/jsonstore/blog/posts/${id}`);
            let post = await res.json();

            resultParagraph.textContent = post.body;
        })()
        postsBody.appendChild(resultParagraph);

        async function commentGenerate() {
            let res = await fetch('http://localhost:3030/jsonstore/blog/comments');
            let allComents = await res.json();

            let validCommentsId = Object.keys(allComents).filter(key => allComents[key].postId == id);

            validCommentsId.forEach(commentId => {
                let liElem = document.createElement('li');
                liElem.id = id;
                liElem.textContent = allComents[commentId].text;
                commentsBody.appendChild(liElem);
            })
        }

        commentGenerate()
    }
}

attachEvents();