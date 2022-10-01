const api_url = "http://localhost:3000/";

const getToDoList = async function () {
  const settings = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const fetchResponse = await fetch(api_url, settings);
    return await fetchResponse.json();
  } catch (e) {
    console.log(e);
  }
};

const postToDo = async function (toDo) {
  const settings = {
    method: "POST",
    body: JSON.stringify(toDo),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const fetchResponse = await fetch(api_url, settings);
  } catch (e) {
    console.log(e);
  }
};

const updateToDo = async function (id, data) {
  const settings = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const fetchResponse = await fetch(api_url + id, settings);
  } catch (e) {
    console.log(e);
  }
};

const deleteToDo = async function (toDoId) {
  const settings = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const fetchResponse = await fetch(api_url + toDoId, settings);
  } catch (e) {
    console.log(e);
  }
};
