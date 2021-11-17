

const responseDiv = document.getElementById("response-div");
const resultDiv = document.getElementById("result-div");
let users = [];

const getUsers = () => {
  const URL = "https://registration-assignment1.herokuapp.com/users";

  axios.get(URL).then((response) => {
    users = response.data;

    if (response.data.length === 0) {
      responseDiv.innerHTML = "No Users";
    } else {
      responseDiv.innerHTML = "";

      const usersList = users.map((user, index) => {
        return `<tr><td>${index}</td><td>${user.name}</td><td>${user.email}</td><td>${user.address}</td><td><button class="btn btn-primary" onclick="editUser('${user._id}', ${index})">Edit</button></td><td><button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button></td></tr>`;
      });

      resultDiv.innerHTML = "";

      resultDiv.innerHTML = usersList.join("");
    }
  });
};

getUsers();

const addUser = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const addUserURL = "https://registration-assignment1.herokuapp.com/user";

  if (name === "" || email === "" || address === "") {
    alert("Please Fill All the Fields");
  } else {
    const userData = {
      name: name,
      email: email,
      address: address,
    };

    axios.post(addUserURL, userData).then((response) => {
      alert(`${userData.name} is Added`);
      getUsers();
      const name = (document.getElementById("name").value = "");
      const email = (document.getElementById("email").value = "");
      const address = (document.getElementById("address").value = "");
    });
  }
};

const deleteUser = (_id) => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const deleteUserURL = `https://registration-assignment1.herokuapp.com/user/${_id}`;

  const userData = {
    name: name,
    email: email,
    address: address,
  };

  axios.delete(deleteUserURL, userData).then((res) => {
    alert(`${userData.name} User Deleted Successfully`);

    resultDiv.innerHTML = "";

    getUsers();
  });
};

const editUser = (_id, index) => {
  const userObject = users[index];

  resultDiv.innerHTML = `<tr id="${_id}">
  <td id=${_id}> ${index} </td>
  <td><input class="form-control shadow-none" type="text" id="${_id}-name" value="${userObject.name}" /></td>
  <td><input class="form-control shadow-none" type="text" id="${_id}-email" value="${userObject.email}" /></td>
  <td><input class="form-control shadow-none" type="text" id="${_id}-address" value="${userObject.address}" /></td>
  <td><button class="btn btn-success" onclick="updateUser('${_id}')">Update</button></td>
  </tr>`;
};

const updateUser = (_id) => {
  const name = document.getElementById(`${_id}-name`).value;
  const email = document.getElementById(`${_id}-email`).value;
  const address = document.getElementById(`${_id}-address`).value;

  const updateUserURL = `https://registration-assignment1.herokuapp.com/user/${_id}`;

  const userData = {
    id: _id,
    name: name,
    email: email,
    address: address,
  };

  axios.put(updateUserURL, userData).then((res) => {
    alert(`${userData.name} is Updated`);
    getUsers();
  });
};