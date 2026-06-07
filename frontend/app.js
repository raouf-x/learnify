// ===================================
//   LEARNIFY — MAIN JAVASCRIPT FILE
// ===================================


// ----- 1. WAIT FOR PAGE TO LOAD -----
// Everything runs AFTER the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {


  // ----- 2. HAMBURGER MENU (Mobile) -----
  // On small screens, show/hide the nav links
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('nav ul');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }


  // ----- 3. STICKY NAVBAR SHADOW -----
  // Add a stronger shadow when the user scrolls down
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ----- 4. SEARCH BAR FILTER -----
  // Filter course cards in real-time as user types
  const searchInput = document.querySelector('#search-input');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const courseCards = document.querySelectorAll('.course-card');

      courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }


  // ----- 5. DYNAMIC COURSE CARDS -----
  // Course data stored as a JavaScript array of objects
  const courses = [
    {
      title: 'HTML & CSS for Beginners',
      instructor: 'Ali Hassan',
      rating: '4.8',
      students: 230,
      image: 'https://via.placeholder.com/300x180?text=HTML+%26+CSS',
      category: 'frontend'
    },
    {
      title: 'JavaScript from Zero',
      instructor: 'Sara Ahmed',
      rating: '4.9',
      students: 540,
      image: 'https://via.placeholder.com/300x180?text=JavaScript',
      category: 'frontend'
    },
    {
      title: 'React.js Complete Guide',
      instructor: 'Karim Boudjema',
      rating: '4.7',
      students: 310,
      image: 'https://via.placeholder.com/300x180?text=React',
      category: 'frontend'
    },
    {
      title: 'Node.js & Express API',
      instructor: 'Youssef Amrani',
      rating: '4.6',
      students: 190,
      image: 'https://via.placeholder.com/300x180?text=Node.js',
      category: 'backend'
    },
    {
      title: 'MongoDB for Beginners',
      instructor: 'Nadia Benali',
      rating: '4.5',
      students: 150,
      image: 'https://via.placeholder.com/300x180?text=MongoDB',
      category: 'backend'
    },
    {
      title: 'Full Stack Project Build',
      instructor: 'Karim Boudjema',
      rating: '4.9',
      students: 420,
      image: 'https://via.placeholder.com/300x180?text=Full+Stack',
      category: 'fullstack'
    }
  ];

  // Find the course list container in the HTML
  const courseList = document.querySelector('.course-list');

  // Function to render (display) course cards
  function renderCourses(courseArray) {
    courseList.innerHTML = ''; // Clear existing cards

    courseArray.forEach(course => {
      // Create a card element for each course
      const card = document.createElement('div');
      card.classList.add('course-card');
      card.setAttribute('data-category', course.category);

      // Fill the card with HTML content
      card.innerHTML = `
        <img src="${course.image}" alt="${course.title}" />
        <h3>${course.title}</h3>
        <p>Instructor: ${course.instructor}</p>
        <span>⭐ ${course.rating} (${course.students} students)</span>
        <a href="#">Watch Now</a>
      `;

      courseList.appendChild(card); // Add card to the page
    });
  }

  // Render all courses when the page loads
  if (courseList) {
    renderCourses(courses);
  }


  // ----- 6. CATEGORY FILTER BUTTONS -----
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add 'active' to the clicked button
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      if (category === 'all') {
        renderCourses(courses); // Show all
      } else {
        const filtered = courses.filter(c => c.category === category);
        renderCourses(filtered); // Show filtered
      }
    });
  });


  // ----- 7. SMOOTH SCROLL -----
  // When clicking nav links, scroll smoothly
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ----- 8. HERO TYPING ANIMATION -----
  const heroTitle = document.querySelector('#hero h1');
  if (heroTitle) {
    const text = 'Learn Without Limits';
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80); // Speed: 80ms per character
      }
    }

    typeWriter();
  }


}); // End of DOMContentLoaded