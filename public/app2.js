console.log('hello world with axios', window.axios);

function getStudents() {
  console.log('Fetching students...');
  axios.get('/students')
    .then(response => {
      console.log('Students fetched successfully:', response);

      const studentsElement = document.getElementById('students');
      studentsElement.innerHTML = ''; // Clear previous content

      response.data.forEach(student => {
        renderStudent(student);
      });
    });

  console.log('log after fetch students');
}

function renderStudent(student) {
  console.log('Rendering student', student, student.id);
  const studentsElement = document.getElementById('students');
  studentsElement.innerHTML += `
          <div class="student" data-id="${student.id}">
            <p>${ student.firstname } ${student.lastname}</p>
            <div>
              <button class="delete-student">Delete</button>
            </div>
          </div>`;
}

function addStudent(data) {
  console.log('Adding student', data);

  axios.post('/students', data)
    .then(response => {
      console.log('add student response', response);
      renderStudent(response.data);
    });
}

function deleteStudent(id) {
  console.log('Deleting student', id);

  axios.delete(`/students/${id}`)
    .then(response => {
      console.log('delete student response', response);
      getStudents();
    });
}

function onSubmit(event) {
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
}

function init() {
  getStudents();

  const studentForm = document.getElementById('student-form');
  studentForm.addEventListener('submit', onSubmit);

  const wrapper = document.getElementById('students');
  wrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-student')) {
      const studentElement = event.target.closest('.student');
      const studentId = studentElement.getAttribute('data-id');
      deleteStudent(studentId);
    }
  });
}

init();