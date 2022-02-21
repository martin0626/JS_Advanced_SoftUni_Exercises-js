export async function loadAllComments(ownerId) {
    let commentsReq = await fetch(' http://localhost:3030/jsonstore/collections/myboard/comments');
    let commentsRes = await commentsReq.json();
    Array.from(document.querySelectorAll('.user-comment')).forEach(x => x.remove());
    let comments = Object.keys(commentsRes).filter(key => commentsRes[key].postId == ownerId)
    comments.forEach(key => createElements(commentsRes[key]))


}

function createElements(data) {
    let divElem = document.createElement('div');
    divElem.className = 'user-comment';
    divElem.innerHTML = ` <div class="topic-name-wrapper">
    <div class="topic-name">
        <p><strong>${data.username}</strong> commented on <time>${data.currentTime}</time></p>
        <div class="post-content">
            <p>${data.comment}</p>
        </div>
    </div>
</div>`
    document.querySelector('.comment').appendChild(divElem);
}


export function commentFormShow() {
    let divElement = document.createElement('div');
    divElement.className = "answer-comment";
    divElement.innerHTML = `<p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>`

    return divElement;
}


export async function postComment(event) {
    event.preventDefault();
    let date = new Date().toUTCString()
    let form = event.target;
    let data = new FormData(form);
    let comment = data.get('postText');
    let username = data.get('username');
    let postId = document.querySelector('.comment').id;

    let postCommentRequest = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment: comment,
            username: username,
            postId: postId,
            currentTime: date
        })
    })
    loadAllComments(postId);
    form.reset();
}