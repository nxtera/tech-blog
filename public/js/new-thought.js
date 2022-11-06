// Submit New Thought
const sendNewThought = async function (event) {
  event.preventDefault();
  const title = document.getElementById("thoughtTitle").value;
  const content = document.getElementById("thoughtText").value;
  if (title && content) {
    await fetch("/api/thoughts/", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.replace("/dashboard");
    console.log("Success! New thought has been submitted.");
  }
};
