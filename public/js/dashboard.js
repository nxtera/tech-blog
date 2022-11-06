// Delete Thought function
const deleteThought = async function (event) {
  event.preventDefault();
  const thoughtID = event.target.dataset.id;
  if (thoughtID) {
    await fetch(`/api/thoughts/${thoughtID}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.reload();
    console.log("Thought has sucessfully been deleted!");
  }
};

//Log Out Function
async function logOut(event) {
  event.preventDefault();
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
    console.log("Successfully logged user out!");
  } else {
    alert(response.statusText);
  }
}
