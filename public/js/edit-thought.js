let thoughtID = window.location.href.split("/")[5];
console.log(thoughtID);

// Edit Thought function
const sendEditedThought = async function (event) {
  event.preventDefault();
  const newThoughtTitle = document.getElementById("newTitle").value;
  const newThoughtContent = document.getElementById("newText").value;

  if (newThoughtTitle && newThoughtContent) {
    await fetch(`/api/thoughts/${thoughtID}`, {
      method: "PUT",
      body: JSON.stringify({
        newThoughtTitle,
        newThoughtContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.replace("/dashboard");
    console.log("Sucess! Thought has been updated.");
  }
};
