// ===================================
//   LEARNIFY — API CONFIGURATION
// ===================================

const API_URL = 'https://learnify-57xq.onrender.com/api';

// ===== AUTH CALLS =====

// Register new user
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

// Login user
export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

// Get current logged in user
export const getMe = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
};

// ===== COURSE CALLS =====

// Get all courses
export const getCourses = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/courses?${params}`);
  return res.json();
};

// Get single course
export const getCourseById = async (id) => {
  const res = await fetch(`${API_URL}/courses/${id}`);
  return res.json();
};

// Create a course (instructor only)
export const createCourse = async (courseData, token) => {
  const res = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(courseData)
  });
  return res.json();
};

// Delete a course
export const deleteCourse = async (id, token) => {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export default API_URL;