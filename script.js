document.addEventListener("DOMContentLoaded", function() {
    function toggleQuizForm(overlayId, show) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.style.display = show ? "flex" : "none";
            if (show) {
                setTimeout(() => overlay.classList.add('show'), 10);
            } else {
                overlay.classList.remove('show');
                setTimeout(() => overlay.style.display = "none", 500);
            }
        }
    }

    function initQuizForm(buttonId, overlayId, closeBtnId) {
        const openButton = document.getElementById(buttonId);
        const closeButton = document.getElementById(closeBtnId);
        const overlay = document.getElementById(overlayId);

        openButton.addEventListener("click", function(e) {
            e.preventDefault();
            toggleQuizForm(overlayId, true);
        });

        closeButton.addEventListener("click", function() {
            toggleQuizForm(overlayId, false);
        });

        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) {
                toggleQuizForm(overlayId, false);
            }
        });
    }

    initQuizForm("takePreTestLink", "quizFormOverlay", "closeQuizForm");
    initQuizForm("takepostTestLink", "quizFormOverlay1", "closeQuizForm1");

    document.getElementById('preTestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }
        checkPreTestAnswers();
    });

    function checkPreTestAnswers() {
        const correctAnswers = {
            aiQuestion1: 'B',
            aiQuestion2: 'C',
            aiQuestion3: 'D',
            aiQuestion4: 'B',
            aiQuestion5: 'B',
            aiQuestion6: 'B',
            aiQuestion7: 'B',
            aiQuestion8: 'A',
            aiQuestion9: 'C',
            aiQuestion10: 'D'
        };
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;

        Object.keys(correctAnswers).forEach((key, index) => {
            let questionOptions = document.querySelector(`input[name="${key}"]:checked`);
            if (questionOptions && questionOptions.value === correctAnswers[key]) {
                score++;
            }
        });

        const percentage = (score / totalQuestions) * 100;
        displayPreTestResult(percentage);
    }

    function displayPreTestResult(percentage) {
        const form = document.getElementById('preTestForm');
        const resultDisplay = document.getElementById('resultDisplay');
        const scoreParagraph = document.getElementById('scoreParagraph');
        const scoreFill = document.getElementById('scoreFill');
        const commentParagraph = document.getElementById('commentParagraph');
    
        form.style.display = 'none'; // Hide the form after submission
        resultDisplay.style.display = 'block'; // Show the results section
    
        let start = 0;
        const end = percentage;
        const duration = 2000; // Duration in milliseconds for the score fill animation
        const stepTime = duration / end; // Time to wait between steps
    
        const counter = setInterval(function() {
            if (start <= end) {
                scoreParagraph.innerHTML = `You scored ${start.toFixed(2)}%`;
                scoreFill.style.width = `${start}%`;
                start++;
            } else {
                clearInterval(counter); // Stop the interval when reaching the target score
            }
        }, stepTime);
    
        // Set a timeout to match the duration of the score fill animation
        setTimeout(function() {
            commentParagraph.style.display = 'block'; // Show the comment
            triggerConfetti(); // Trigger confetti after the fill animation is complete
        }, duration);
    }

    function checkPostTestAnswers() {
        const correctAnswers = {
            aiQuestion1: 'B',
            aiQuestion2: 'C',
            aiQuestion3: 'D',
            aiQuestion4: 'B',
            aiQuestion5: 'B',
            aiQuestion6: 'B',
            aiQuestion7: 'B',
            aiQuestion8: 'A',
            aiQuestion9: 'C',
            aiQuestion10: 'D'
        };
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;

        Object.keys(correctAnswers).forEach((key, index) => {
            let questionOptions = document.querySelector(`input[name="${key}"]:checked`);
            if (questionOptions && questionOptions.value === correctAnswers[key]) {
                score++;
                highlightAnswer(key, questionOptions, true);
            } else if (questionOptions) {
                highlightAnswer(key, questionOptions, false);
            }
        });

        const percentage = (score / totalQuestions) * 100;
        displayPostTestResult(percentage);
    }

    function highlightAnswer(question, selectedOption, isCorrect) {
        if (isCorrect) {
            selectedOption.parentElement.style.backgroundColor = 'lightgreen';
        } else {
            selectedOption.parentElement.style.backgroundColor = 'lightcoral';
        }
    }

    function displayPostTestResult(percentage) {
        const form = document.getElementById('postTestForm');
        const resultDisplay = document.getElementById('resultDisplay1');
        const scoreParagraph = document.getElementById('scoreParagraph1');
        const scoreFill = document.getElementById('scoreFill1');
        const commentParagraph = document.getElementById('commentParagraph1');
    
        resultDisplay.style.display = 'block'; // Show the results section
    
        let start = 0;
        const end = percentage;
        const duration = 2000; // Duration in milliseconds for the score fill animation
        const stepTime = duration / end; // Time to wait between steps
    
        const counter = setInterval(function() {
            if (start <= end) {
                scoreParagraph.innerHTML = `You scored ${start.toFixed(2)}%`;
                scoreFill.style.width = `${start}%`;
                start++;
            } else {
                clearInterval(counter); // Stop the interval when reaching the target score
            }
        }, stepTime);
    
        // Set a timeout to match the duration of the score fill animation
        setTimeout(function() {
            if (percentage < 75) {
                commentParagraph.innerHTML = "Nice try! No worries you can retake the test. Please note that you need at least 75% to pass.";
            } else if (percentage < 100) {
                commentParagraph.innerHTML = "Great job! You've learned really well. If you want to achieve higher result, you may retake the test. If not, you're free to proceed to the next module.";
            } else {
                commentParagraph.innerHTML = "PERFECT! You may now proceed to the next module. Please exit this form.";
            }
            commentParagraph.style.display = 'block'; // Show the comment
            triggerConfetti(); // Trigger confetti after the fill animation is complete
        }, duration);

        // Scroll to the top of the results section
        form.scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById('postTestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }
        checkPostTestAnswers();
    });

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 } // Adjust as needed to ensure it looks good on your layout
        });
    }

    function updateActiveNavLink() {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active-link');
        });

        const visibleSection = document.querySelector(".main > section:not([style*='display: none'])");
        if (visibleSection) {
            const activeLink = document.querySelector(`nav ul li a[href="#${visibleSection.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active-link');
            }
        }
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                document.querySelectorAll(".main > section").forEach(section => {
                    section.style.display = 'none';
                });
                targetSection.style.display = 'block';
                updateActiveNavLink();
            }
        });
    });

    function proceedToNextLesson(currentId, nextId) {
        const currentSection = document.getElementById(currentId);
        const nextSection = document.getElementById(nextId);

        if (currentSection && nextSection) {
            currentSection.style.display = 'none';  // Hide the current section
            nextSection.style.display = 'block';    // Show the next section
            window.scrollTo(0, 0);                  // Optionally scroll to the top of the page
            updateActiveNavLink();                  // Update navigation links if applicable
        }
    }

    // Bind this function to the global window object so it can be accessed in the inline HTML onclick attribute
    window.proceedToNextLesson = proceedToNextLesson;
});
