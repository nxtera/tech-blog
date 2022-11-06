let thought_id = window.location.href.split("/")[4];

// Submit New Comment
const sendNewComment = async function (event) {
  event.preventDefault();
  const comment_text = document.getElementById("commentText").value;

  if (comment_text) {
    let response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({
        thought_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace("/dashboard");
    }
  }
};
