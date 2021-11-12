const responseDiv = document.getElementById("response-div");
const resultDiv = document.getElementById("result-div");

const getUsers = () => {
  const URL = "https://registration-assignment1.herokuapp.com/users";

  axios.get(URL).then((response) => {
    const users = response.data;

    if (response.data.length === 0) {
      responseDiv.innerHTML = "No Users";
    } else {
      responseDiv.innerHTML = "";

      const usersList = users.map((user) => {
        return `<tr><td>${user._id}</td><td>${user.name}</td><td>${user.email}</td><td>${user.address}</td><td><button class="btn btn-primary" onclick="editUser('${user._id}')">Edit</button></td><td><button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button></td></tr>`;
      });

      resultDiv.innerHTML = "";

      resultDiv.innerHTML = usersList.join("");
    }
  });
};

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
      const name = document.getElementById("name").value = "";
      const email = document.getElementById("email").value = "";
      const address = document.getElementById("address").value = "";
    });
  }
};

function deleteUser(_id) {
  const deleteUserURL = `https://registration-assignment1.herokuapp.com/user/${_id}`;

  axios.delete(deleteUserURL).then((res) => {
    alert(`User Deleted Successfully`);

    resultDiv.innerHTML = "";

    getUsers();
  });
}

// function editUser(_id) {

  
// }