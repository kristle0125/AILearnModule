document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const nav = document.querySelector("nav");
  
    menuIcon.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  });




  function proceedToNextLesson(nextLessonId) {
    // Hide the current lesson
    document.querySelector('.main').style.display = 'none';
    // Show the next lesson
    document.querySelector(nextLessonId).style.display = 'block';
  }
  
  