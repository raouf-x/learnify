// All course data in one place
// Later this will come from your backend API

const courses = [
  {
    id: 1,
    title: 'HTML & CSS for Beginners',
    instructor: 'Ali Hassan',
    rating: 4.8,
    students: 230,
    category: 'frontend',
    image: 'https://via.placeholder.com/300x180?text=HTML+%26+CSS',
    videoUrl: 'https://www.youtube.com/embed/G3e-cpL7ofc',
    description: 'Learn the building blocks of the web from scratch.'
  },
  {
    id: 2,
    title: 'JavaScript from Zero',
    instructor: 'Sara Ahmed',
    rating: 4.9,
    students: 540,
    category: 'frontend',
    image: 'https://via.placeholder.com/300x180?text=JavaScript',
    videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
    description: 'Master JavaScript fundamentals step by step.'
  },
  {
    id: 3,
    title: 'React.js Complete Guide',
    instructor: 'Karim Boudjema',
    rating: 4.7,
    students: 310,
    category: 'frontend',
    image: 'https://via.placeholder.com/300x180?text=React',
    videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    description: 'Build modern UIs with React from beginner to advanced.'
  },
  {
    id: 4,
    title: 'Node.js & Express API',
    instructor: 'Youssef Amrani',
    rating: 4.6,
    students: 190,
    category: 'backend',
    image: 'https://via.placeholder.com/300x180?text=Node.js',
    videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
    description: 'Build REST APIs with Node.js and Express.'
  },
  {
    id: 5,
    title: 'MongoDB for Beginners',
    instructor: 'Nadia Benali',
    rating: 4.5,
    students: 150,
    category: 'backend',
    image: 'https://via.placeholder.com/300x180?text=MongoDB',
    videoUrl: 'https://www.youtube.com/embed/ofme2o29ngU',
    description: 'Learn NoSQL databases with MongoDB.'
  },
  {
    id: 6,
    title: 'Full Stack Project Build',
    instructor: 'Karim Boudjema',
    rating: 4.9,
    students: 420,
    category: 'fullstack',
    image: 'https://via.placeholder.com/300x180?text=Full+Stack',
    videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
    description: 'Build a complete full stack app from scratch.'
  }
];

export default courses;