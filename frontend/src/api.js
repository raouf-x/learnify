// ===================================
//   LEARNIFY — API CONFIGURATION
// ===================================

// Uses environment variable in production, fallback for development
const API_URL = import.meta.env.VITE_API_URL || 'https://learnify-57xq.onrender.com/api';

// ===== AUTH CALLS =====

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

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

export const getCourses = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/courses?${params}`);
  return res.json();
};

export const getCourseById = async (id) => {
  const res = await fetch(`${API_URL}/courses/${id}`);
  return res.json();
};

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

export const deleteCourse = async (id, token) => {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export default API_URL;
// ===== PROGRESS CALLS =====

// Mark course as complete
export const markCourseComplete = async (courseId, token) => {
  const res = await fetch(`${API_URL}/progress/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ courseId })
  });
  return res.json();
};

// Mark course as watched
export const markCourseWatched = async (courseId, token) => {
  const res = await fetch(`${API_URL}/progress/watch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ courseId })
  });
  return res.json();
};

// Get all progress
export const getUserProgress = async (token) => {
  const res = await fetch(`${API_URL}/progress`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};