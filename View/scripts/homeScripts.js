document.addEventListener('DOMContentLoaded', function () {
    let employeesVisible = false; // Променлива за проверка на видимостта на служителите
    let searchEmployeeVisible = false; 
    // Функция, която показва или скрива служителите в зависимост от текущото състояние
    function toggleEmployeesVisibility() {
        if (employeesVisible) {
            document.getElementById('employeeList').innerHTML = ''; // Изчистване на списъка със служители
        } else {
            showAllEmployees(); // Показване на служителите
        }
        employeesVisible = !employeesVisible; // Промяна на състоянието на видимост
    }
    
    // Извикване на функцията при цъкане на бутона за показване на служителите
    document.getElementById('showEmployee').addEventListener('click', toggleEmployeesVisibility);
});

// Функция, която показва всички служители
function showAllEmployees() {
    fetch('/api/employee')
        .then(response => response.json())
        .then(data => {
            // Преобразуване на отговора в HTML формат
            const employeeListHTML = data.response.map(employee => {
                return `
                    <div class="employee" id="employee-${employee._id}"> <!-- Добавяне на id с идентификатор, който включва идентификатора на работника -->
                        <img src="${employee.avatar}" alt="Avatar" width="100"> <!-- Изображението на аватара -->
                        <p>Name: ${employee.name}</p>
                        <p>Designation: ${employee.designation}</p>
                        <p>Email: ${employee.email}</p>
                        <p>Phone: ${employee.phone}</p>
                        <p>Age: ${employee.age}</p>
                        <p>ID: ${employee._id}</p>
                        <button class="delete-button" onclick="deleteEmployee('${employee._id}')">X</button> <!-- Бутон за изтриване -->
                    </div>
                `;
            }).join('');

            // Показване на работниците на нова страница
            document.getElementById('employeeList').innerHTML = employeeListHTML;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Функция, която изтрива служител
function deleteEmployee(employeeId) {
    fetch('/api/employee/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            employeeId: employeeId
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Показва съобщението за изтриване в конзолата

        // Намира и премахва динамично дива със съответния идентификатор
        const employeeDiv = document.getElementById(`employee-${employeeId}`);
        if (employeeDiv) {
            employeeDiv.parentNode.removeChild(employeeDiv);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}
document.addEventListener('DOMContentLoaded', function () {
let addEmployeeFormVisible = false; // Променлива за проверка на видимостта на формата за добавяне на служител

// Функция, която показва или скрива формата за добавяне на нов служител в зависимост от текущото състояние
function toggleAddEmployeeFormVisibility() {
if (addEmployeeFormVisible) {
    document.getElementById('addEmployeeForm').style.display = 'none'; // Скриване на формата
} else {
    document.getElementById('addEmployeeForm').style.display = 'block'; // Показване на формата
}
addEmployeeFormVisible = !addEmployeeFormVisible; // Промяна на състоянието на видимост
}

// Извикване на функцията при цъкане на бутона за добавяне на нов служител
document.getElementById('addNewEmployee').addEventListener('click', toggleAddEmployeeFormVisibility);

// Функция, която изпраща POST заявка за създаване на нов служител
document.getElementById('employeeForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвратява презареждането на страницата

const formData = new FormData(document.getElementById('employeeForm'));

fetch('/api/employee/store', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    console.log(data.message); // Показва съобщението за добавяне в конзолата

    // Изчистване на формата след добавяне на нов служител
    document.getElementById('employeeForm').reset();

    // Скриване на формата за добавяне на нов служител
    document.getElementById('addEmployeeForm').style.display = 'none';

    // Показване на всички служители, за да се вижда новият служител
    showAllEmployees();
})
.catch(error => {
    console.error('Error:', error);
});
});
});


document.addEventListener('DOMContentLoaded', function () {
let searchEmployeeVisible = false; // Променлива за проверка на видимостта на формата за търсене на служител

// Функция, която показва или скрива формата за търсене на служител в зависимост от текущото състояние
function toggleSearchEmployeeFormVisibility() {
const searchEmployeeForm = document.getElementById('searchEmployeeForm');
if (searchEmployeeVisible) {
    searchEmployeeForm.style.display = 'none'; // Скриване на формата за търсене
} else {
    searchEmployeeForm.style.display = 'block'; // Показване на формата за търсене
}
searchEmployeeVisible = !searchEmployeeVisible; // Промяна на състоянието на видимост
}

// Извикване на функцията при цъкане на бутона за търсене на служител
document.getElementById('showEmployeeById').addEventListener('click', toggleSearchEmployeeFormVisibility);

// Обработка на формата за търсене на служител
document.getElementById('searchForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвратява презареждането на страницата

const searchId = document.getElementById('searchId').value; // Взимане на стойността на полето за ID

fetch('api/employee/show', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        employeeId: searchId
    })
})
.then(response => response.json())
.then(data => {
    const employeeData = data.response;
    if (employeeData) {
        // Преобразуване на отговора в HTML формат
        const employeeHTML = `
        <div class="employee" id="employee-${employeeData._id}">
        <img src="${employeeData.avatar}" alt="Avatar" width="100">
        <p>Name: ${employeeData.name}</p>
        <p>Designation: ${employeeData.designation}</p>
        <p>Email: ${employeeData.email}</p>
        <p>Phone: ${employeeData.phone}</p>
        <p>Age: ${employeeData.age}</p>
        <button class="edit-button" data-employee-id="${employeeData._id}">Edit</button>
        </div>
        `;
        // Показване на данните за служителя
        document.getElementById('result').innerHTML = employeeHTML;
    } else {
        // Ако не е намерен служител с този ID, показва съобщение
        document.getElementById('result').innerHTML = '<p>No employee found with this ID.</p>';
    }
})
.catch(error => {
    console.error('Error:', error);
});
});
});









document.addEventListener('DOMContentLoaded', function () {
// Добавяме събитие за отваряне на формата за редактиране при клик върху бутона за редактиране
document.getElementById('result').addEventListener('click', function(event) {
if (event.target.classList.contains('edit-button')) {
    const employeeId = event.target.dataset.employeeId;
    const employeeData = document.getElementById(`employee-${employeeId}`);
    const updateName = employeeData.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
    const updateDesignation = employeeData.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
    const updateEmail = employeeData.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
    const updatePhone = employeeData.querySelector('p:nth-of-type(4)').textContent.split(': ')[1];
    const updateAge = employeeData.querySelector('p:nth-of-type(5)').textContent.split(': ')[1];

    // Попълване на формата за редактиране със съответните данни
    document.getElementById('updateName').value = updateName;
    document.getElementById('updateDesignation').value = updateDesignation;
    document.getElementById('updateEmail').value = updateEmail;
    document.getElementById('updatePhone').value = updatePhone;
    document.getElementById('updateAge').value = updateAge;

    // Показване на формата за редактиране
    document.getElementById('updateEmployeeForm').style.display = 'block';
}
});


// Обработка на формата за редактиране на служител
document.getElementById('updateForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвратява презареждането на страницата

const employeeId = document.getElementById('searchId').value; // Взимане на стойността на полето за ID
const updateName = document.getElementById('updateName').value;
const updateDesignation = document.getElementById('updateDesignation').value;
const updateEmail = document.getElementById('updateEmail').value;
const updatePhone = document.getElementById('updatePhone').value;
const updateAge = document.getElementById('updateAge').value;

fetch('/api/employee/update', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        employeeId: employeeId,
        name: updateName,
        designation: updateDesignation,
        email: updateEmail,
        phone: updatePhone,
        age: updateAge
    })
})
.then(response => response.json())
.then(data => {
    if (data.message === 'Employee updated successfully!') {
        // Показване на съобщение за успешно актуализиране на служителя
        document.getElementById('result').innerHTML = '<p>Employee updated successfully!</p>';
        document.getElementById('updateEmployeeForm').style.display = 'none';
    } else {
        // Ако не е успешно, показва съобщение за грешка
        document.getElementById('result').innerHTML = '<p>Employee update failed.</p>';
    }
})
.catch(error => {
    console.error('Error:', error);
});
});
});



