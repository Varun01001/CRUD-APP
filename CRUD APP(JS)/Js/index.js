document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");
  const addButton = document.getElementById("addButton");

  ///=> Load users from localStorage
  function loadUsers() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      tableBody.innerHTML = ""; // Clear table
      users.forEach((user, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <th>${index + 1}.</th>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.age}</td>
              <td>${user.phone}</td>
              <td>
                  <button class="btn btn-primary update-btn" data-index="${index}">
                      <i class="fa-solid fa-pen"></i> Update
                  </button>
              </td>
              <td>
                  <button class="btn btn-danger delete-btn" data-index="${index}">
                      <i class="fa-solid fa-trash-can"></i> Delete
                  </button>
              </td>
          `;
          tableBody.appendChild(row);
      });
  }

  ///=> Redirect to add.html
  addButton.addEventListener("click", () => {
      window.location.href = "/From/Add.html";
  });

  /// Delete User
  tableBody.addEventListener("click", (event) => {
      if (event.target.closest(".delete-btn")) {
          const index = event.target.closest(".delete-btn").dataset.index;
          const users = JSON.parse(localStorage.getItem("users")) || [];
          users.splice(index, 1); /// Remove user
          localStorage.setItem("users", JSON.stringify(users));
          loadUsers(); /// Refresh table
      }
  });

  ///=> Redirect to Update.html
  tableBody.addEventListener("click", (event) => {
      if (event.target.closest(".update-btn")) {
          const index = event.target.closest(".update-btn").dataset.index;
          localStorage.setItem("updateIndex", index); /// Save index
          window.location.href = "/From/Update.html";
      }
  });

  loadUsers(); 
});

