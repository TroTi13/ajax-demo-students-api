// express server

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import data from './students.json' with { type: 'json' };
let students = data.students;

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const student = students.find((student) => student.id === parseInt(id));
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
});

app.get('/students/:profile', (req, res) => {
  const { profile } = req.params;
  const _students = students.filter((student) => student.profile.toLowerCase() === profile.toLowerCase());
  
  res.json(_students);
});

app.post('/students', (req, res) => {
  console.log('POST /students', req.body);
  const { profile, firstname, lastname, age, email } = req.body;
  console.log(profile);
  const newStudent = {
    id: students.length + 1,
    major: 'MCT',
    profile,
    firstname,
    lastname,
    age,
    email,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { profile, firstname, lastname, age, email } = req.body;

  const studentIndex = students.findIndex((student) => student.id === parseInt(id));
  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const existingStudent = students[studentIndex];
  const _student = {
    id: existingStudent.id,
    major: existingStudent.major,
    profile: profile || existingStudent.profile,
    firstname: firstname || existingStudent.firstname,
    lastname: lastname || existingStudent.lastname,
    age: age || existingStudent.age,
    email: email || existingStudent.email,
  };

  // Update the student in the array
  students[studentIndex] = _student;
  res.json(_student);
});

app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex((student) => student.id === parseInt(id));
  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  students.splice(studentIndex, 1);
  res.status(200).json({
    message: 'Student deleted successfully',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});