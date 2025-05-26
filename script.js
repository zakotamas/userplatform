document.addEventListener("DOMContentLoaded", loadUsers);

function addUser() {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const ageInput = document.getElementById("ageInput");
    const cityInput = document.getElementById("cityInput");
    const colorInput = document.getElementById("colorInput");
    
    if (nameInput.value.trim() === "" || emailInput.value.trim() === "") return;

    const user = {
        name: nameInput.value,
        email: emailInput.value,
        age: ageInput.value,
        city: cityInput.value,
        color: colorInput.value
    };

    saveUser(user);
    
    nameInput.value = "";
    emailInput.value = "";
    ageInput.value = "";
    cityInput.value = "";
    colorInput.value = "kék"; // Alapértelmezett visszaállítás
    
    loadUsers();
}

function renderUser(user, index) {
    const userTable = document.getElementById("userTable");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td>
            <select onchange="updateUser(${index}, 'color', this.value)">
                <option value="kék" ${user.color === "kék" ? "selected" : ""}>Kék</option>
                <option value="fehér" ${user.color === "fehér" ? "selected" : ""}>Fehér</option>
                <option value="piros" ${user.color === "piros" ? "selected" : ""}>Piros</option>
                <option value="sárga" ${user.color === "sárga" ? "selected" : ""}>Sárga</option>
            </select>
        </td>
        <td>
            <button onclick="editUser(${index})">✏️</button>
            <button onclick="deleteUser(${index})">❌</button>
        </td>
    `;

    userTable.appendChild(row);
}

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function loadUsers() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach((user, index) => renderUser(user, index));
}

function updateUser(index, field, value) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users[index][field] = value;
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

function editUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    document.getElementById("nameInput").value = user.name;
    document.getElementById("emailInput").value = user.email;
    document.getElementById("ageInput").value = user.age;
    document.getElementById("cityInput").value = user.city;
    document.getElementById("colorInput").value = user.color;

    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

// Visszaszámláló inicializálása
let timeLeft = 10; // Kezdőérték: 10 másodperc

function countdown() {
    document.getElementById("countdown").innerText = timeLeft; // Frissítjük a visszaszámlálót
    if (timeLeft === 0) {
        loadUsers(); // Ha eléri a nullát, csak a táblázat frissül!
        timeLeft = 10; // Újraindítjuk a visszaszámlálót
    } else {
        timeLeft--; // Csökkentjük az értéket
    }
}

// Minden másodpercben futtatjuk a visszaszámláló funkciót
setInterval(countdown, 1000); 

// Manuális frissítés gomb funkciója
function manualRefresh() {
    loadUsers(); // **Csak a táblázatot frissíti**, nem az egész oldalt!
    timeLeft = 10; // Újraindítjuk a visszaszámlálót
}

