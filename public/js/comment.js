const commentFormHandler = async function(event) {
  event.preventDefault();

  const postId = document.querySelector('p[name="post-id"]').textContent;
  const body = document.querySelector('textarea[name="comment-body"]').value;
  console.log(body + postId);
  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.location.reload();
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('click', commentFormHandler);
