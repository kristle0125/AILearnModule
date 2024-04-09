document.addEventListener("DOMContentLoaded", function() {
    // Toggle quiz forms visibility
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

    // Initialize quiz forms with open and close functionality
    function initQuizForm(buttonId, overlayId, closeBtnId) {
        const openButton = document.getElementById(buttonId);
        const closeButton = document.getElementById(closeBtnId);
        const overlay = document.getElementById(overlayId);

        if (openButton && closeButton && overlay) {
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
    }

    initQuizForm("takePreTestLink", "quizFormOverlay", "closeQuizForm");
    initQuizForm("takepostTestLink", "quizFormOverlay1", "closeQuizForm1");

    // Handling "Proceed to Next Lesson" button functionality
    window.proceedToNextLesson = function(currentSectionId, nextSectionId) {
        const currentSection = document.getElementById(currentSectionId);
        const nextSection = document.getElementById(nextSectionId);

        if (currentSection && nextSection) {
            currentSection.style.display = 'none';
            nextSection.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        updateActiveNavLink(nextSectionId); // Update active nav link based on the next section
    };

    // Update active navigation link based on current section
    function updateActiveNavLink(activeSectionId = null) {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active-link'); // Remove active class from all links
        });

        if (!activeSectionId) {
            // Find the first section that's not hidden
            const visibleSection = document.querySelector(".main > section:not([style*='display: none'])");
            activeSectionId = visibleSection ? visibleSection.id : null;
        }

        if (activeSectionId) {
            const activeLink = document.querySelector(`nav ul li a[href="#${activeSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active-link'); // Add active class to the current link
            }
        }
    }

    // Initialize active link based on the first visible section
    updateActiveNavLink();

    // Listen for clicks on nav links to update the active state
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1); // Get ID without the '#'
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections
                document.querySelectorAll(".main > section").forEach(section => {
                    section.style.display = 'none';
                });
                // Show the clicked section
                targetSection.style.display = 'block';
                // Update active link
                updateActiveNavLink(targetId);
            }
        });
    });
});
