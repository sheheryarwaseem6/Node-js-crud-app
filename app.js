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
        return `<tr><td>${user._id}</td><td>${user.name}</td><td>${user.email}</td><td>${user.address}</td><td><button class="btn btn-primary" onclick="editUser('${_id, index}')">Edit</button></td><td><button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button></td></tr>`;
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

function editUser(_id, index) {
  console.log(_id, index);

  const userObject = users[index]

  console.log("userObject: ", userObject);

  document.getElementById(_id).innerHTML = `<tr id="${_id}"> 
      
          <th scope="row">${_id}</th>
          <td><input type="text" id="${_id}-name" value="${userObject.name}" /></td>
          <td><input type="text" id="${_id}-email" value="${userObject.email}" /></td>
          <td><input type="text" id="${_id}-address" value="${userObject.address}" /></td>
          <td>
              <button type="button" onclick="updateUser('${_id}')" class="btn btn-success">Update</button>
          </td>
      </tr>`;
}

function updateUser(_id) {

  const name = document.getElementById(`${_id}-name`).value
  const email = document.getElementById(`${_id}-email`).value
  const address = document.getElementById(`${_id}-address`).value

  axios.put(`https://registration-assignment1.herokuapp.com/user/${_id}`, { name, email, address })
      .then(function (response) {
          console.log(response);

          getAllUser();

          document.getElementById("alert").innerHTML =
              `<div class="alert alert-success" role="alert">
                  User Updated Success!
              </div>`

          setTimeout(() => {
              document.getElementById("alert").innerHTML = ""
          }, 3000);

      })
}



getAllUser();
