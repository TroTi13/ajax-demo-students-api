<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Students</h1>

    <div class="bg-white shadow-md rounded-lg overflow-auto mb-8">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ student.firstname }} {{ student.lastname }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.age }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.major }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.profile }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="viewStudent(student)" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
              <button @click="editStudent(student)" class="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
              <button @click="deleteStudent(student)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Details View -->
    <div v-if="selectedStudent" class="bg-white shadow-md rounded-lg p-6 mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Student Details</h2>
        <button @click="selectedStudent = null" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-500">Full Name</h3>
            <p class="mt-1 text-lg">{{ selectedStudent.firstname }} {{ selectedStudent.lastname }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Age</h3>
            <p class="mt-1 text-lg">{{ selectedStudent.age }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Email</h3>
            <p class="mt-1 text-lg">{{ selectedStudent.email }}</p>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-500">Major</h3>
            <p class="mt-1 text-lg">{{ selectedStudent.major }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Profile</h3>
            <p class="mt-1 text-lg">{{ selectedStudent.profile }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Student ID</h3>
            <p class="mt-1 text-lg">{{ selectedStudent.id }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Form -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Edit Student' : 'Add New Student' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="formData.firstname" type="text" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="formData.lastname" type="text" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Age</label>
            <input v-model="formData.age" type="number" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="formData.email" type="email" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Profile</label>
            <select v-model="formData.profile" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2">
              <option value="" selected disabled>Pick a profile</option>
              <option value="Web">Web</option>
              <option value="3D">3D</option>
              <option value="AV">Audio/Video</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button v-if="isEditing" @click="cancelEdit" type="button"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
            {{ isEditing ? 'Update Student' : 'Add Student' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const students = ref([
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    age: 20,
    email: "john.doe@example.com",
    major: "MCT",
    profile: "Web"
  },
  // Add more students as needed
]);

const selectedStudent = ref(null);
const isEditing = ref(false);
const currentStudentId = ref(null);

const formData = reactive({
  firstname: '',
  lastname: '',
  age: '',
  email: '',
  major: '',
  profile: ''
});

const resetForm = () => {
  formData.firstname = '';
  formData.lastname = '';
  formData.age = '';
  formData.email = '';
  formData.major = '';
  formData.profile = '';
  isEditing.value = false;
  currentStudentId.value = null;
};

const handleSubmit = () => {
  console.log('submit', formData);
};

const editStudent = (student) => {
  isEditing.value = true;
  currentStudentId.value = student.id;
  formData.firstname = student.firstname;
  formData.lastname = student.lastname;
  formData.age = student.age;
  formData.email = student.email;
  formData.major = student.major;
  formData.profile = student.profile;
};

const cancelEdit = () => {
  resetForm();
};

const viewStudent = (student) => {
  selectedStudent.value = student;
};

const deleteStudent = (student) => {
  console.log('delete', student);
};
</script>

<style scoped>
/* Add any additional styles here */
</style>

