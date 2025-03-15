# Students API
This is a simple API for managing students using NodeJS & Espress. It allows you to perform CRUD operations on student data, including creating, reading, updating, and deleting student records.

## Prerequisites
- Node.js
- npm (Node Package Manager)

## Installation
1. Clone the repo
2. Install dependencies
```bash
npm install
```
3. Start the server
```bash
npm run dev
```
4. Open your browser and navigate to `http://localhost:3000` to access the API.
5. Use Postman or any other API testing tool to test the endpoints.

## API Endpoints
### 1. Get all students
- **URL**: `/students`
- **Method**: `GET`
- **Description**: Retrieve a list of all students.

### 2. Get a student by ID
- **URL**: `/students/:id`
- **Method**: `GET`
- **Description**: Retrieve a student by their ID.
- **URL Params**: `id=[integer]`

### 3. Create a new student
- **URL**: `/students`
- **Method**: `POST`
- **Description**: Create a new student.

### 4. Update a student by ID
- **URL**: `/students/:id`
- **Method**: `PUT`
- **Description**: Update a student by their ID.
- **URL Params**: `id=[integer]`

### 5. Delete a student by ID
- **URL**: `/students/:id`
- **Method**: `DELETE`
- **Description**: Delete a student by their ID.
- **URL Params**: `id=[integer]`

## Example Request
### Get all students
```javascript
fetch('http://localhost:3000/students')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
### Get a student by ID
```javascript
fetch('http://localhost:3000/students/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Get students by profile
```javascript
fetch('http://localhost:3000/students/:profile')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Create a new student
```javascript
const student = {
  name: "John Doe",
  age: 20,
  profile: "Web"
};
fetch('http://localhost:3000/students', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(student)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
### Update a student
```javascript
const student = {
  name: "Jane Doe",
  age: 21,
  profile: "AV"
};
fetch('http://localhost:3000/students/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(student)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
### Delete a student
```javascript
fetch('http://localhost:3000/students/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Resetting the Database
To reset the database, you can just reboot the server. This will clear all data and start with the inital database.
```bash
npm run dev
```