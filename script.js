function showSection(sectionId) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

let currentUser = "";

// LOAD DATA
window.onload = function () {
  loadProperties();
};

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

// LOGOUT
function logout() {
  currentUser = "";
  alert("Logged out successfully");
  showSection("home");
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

  const newProperty = { property, tenant, rent };

  let properties = JSON.parse(localStorage.getItem("properties")) || [];
  properties.push(newProperty);
  localStorage.setItem("properties", JSON.stringify(properties));

  loadProperties();

  document.getElementById("propertyName").value = "";
  document.getElementById("tenantName").value = "";
  document.getElementById("rent").value = "";
}

// LOAD PROPERTIES
function loadProperties() {
  const list = document.getElementById("propertyList");
  list.innerHTML = "";

  let properties = JSON.parse(localStorage.getItem("properties")) || [];

  if (properties.length === 0) {
    list.innerHTML = "<p>No properties added yet</p>";
    return;
  }

  properties.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${item.property}</strong> | ${item.tenant} | ₹${item.rent}</span>
      <button class="delete-btn" onclick="deleteProperty(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

// DELETE PROPERTY
function deleteProperty(index) {
  let properties = JSON.parse(localStorage.getItem("properties")) || [];
  properties.splice(index, 1);
  localStorage.setItem("properties", JSON.stringify(properties));

  loadProperties();
}
