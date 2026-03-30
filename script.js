function showSection(sectionId) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

let currentUser = "";

// LOGIN
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "owner" && pass === "1234") {
    currentUser = "owner";
    alert("Owner Login Successful");
    document.getElementById("dashboardTitle").innerText = "Owner Dashboard";
    document.getElementById("ownerControls").style.display = "block";
    showSection("dashboard");
  } 
  else if (user === "tenant" && pass === "1234") {
    currentUser = "tenant";
    alert("Tenant Login Successful");
    document.getElementById("dashboardTitle").innerText = "Tenant Dashboard";
    document.getElementById("ownerControls").style.display = "none";
    showSection("dashboard");
  } 
  else {
    alert("Invalid Login Credentials");
  }
}

// ADD PROPERTY
function addProperty() {
  if (currentUser !== "owner") {
    alert("Only Owner can add properties!");
    return;
  }

  const property = document.getElementById("propertyName").value.trim();
  const tenant = document.getElementById("tenantName").value.trim();
  const rent = document.getElementById("rent").value.trim();

  if (!property || !tenant || !rent) {
    alert("Please fill all fields");
    return;
  }

  const list = document.getElementById("propertyList");

  const li = document.createElement("li");
  li.innerHTML = `
    <span><strong>${property}</strong> | ${tenant} | ₹${rent}</span>
    <button class="delete-btn" onclick="deleteProperty(this)">Delete</button>
  `;

  list.appendChild(li);

  // Clear inputs
  document.getElementById("propertyName").value = "";
  document.getElementById("tenantName").value = "";
  document.getElementById("rent").value = "";
}

// DELETE PROPERTY
function deleteProperty(btn) {
  btn.parentElement.remove();
}
