console.log('hello world');

function getStudents() {
  console.log('Fetching students...');
  fetch('/students')
    .then(response => response.json())
    .then(response => {
      console.log('Students fetched successfully:', response);

      const studentsElement = document.getElementById('students');
      studentsElement.innerHTML = ''; // Clear previous content

      response.forEach(student => {
        renderStudent(student);
      });
    });

  console.log('log after fetch students');
}

function renderStudent(student) {
  console.log('Rendering student', student, student.id);
  const studentsElement = document.getElementById('students');
  studentsElement.innerHTML += `
          <div class="student">
            <p>${ student.firstname } ${student.lastname}</p>
            <div>
              <button class="delete-student" onclick="(function () { deleteStudent(${student.id}) })()">Delete</button>
            </div>
          </div>`;
}

function addStudent(data) {
  console.log('Adding student', data);

  fetch('/students', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
  .then(response => {
    console.log('add student response', response)
    renderStudent(response);
  });
}

function deleteStudent(id) {
  console.log('Deleting student', id);

  fetch(`/students/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
  .then(response => {
    console.log('delete student response', response)
    getStudents();
  });
}

function init() {
  getStudents();

  const studentForm = document.getElementById('student-form');
  studentForm.addEventListener('submit', (event) => {
    console.log('Form submitted', event);

    // stop form submit
    event.preventDefault();

    // form ophalen
    const form = event.target;

    // validation...

    // define data structure
    const data = {
      profile: form.profile.value,
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      age: form.age.value,
      email: form.email.value,
    };

    console.log('Form data', data);

    addStudent(data);
  });
}

init();