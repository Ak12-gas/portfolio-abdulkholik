// Welcome Message Function
        function welcomeMessage() {
            // Show the welcome modal
            document.getElementById('welcomeModal').classList.remove('hidden');
            
            // Handle form submission
            document.getElementById('submitWelcome').addEventListener('click', function() {
                let username = document.getElementById('modalName').value.trim();
                
                if (username) {
                    // Display the username in the header
                    document.getElementById("username").innerHTML = username;
                    // Store the username in localStorage
                    localStorage.setItem('portfolioUsername', username);
                    // Close the modal
                    document.getElementById('welcomeModal').classList.add('hidden');
                } else {
                    alert("Please enter your name or click Skip to continue as Guest.");
                }
            });
            
            // Handle skip button
            document.getElementById('skipWelcome').addEventListener('click', function() {
                document.getElementById('welcomeModal').classList.add('hidden');
                alert("Welcome to my portfolio!");
            });
            
            // Allow pressing Enter to submit
            document.getElementById('modalName').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('submitWelcome').click();
                }
            });
        }
        
        // Form Validation Function
        function validateForm() {
            // Get form values
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            // Reset error messages
            document.getElementById('name-error').classList.add('hidden');
            document.getElementById('email-error').classList.add('hidden');
            document.getElementById('message-error').classList.add('hidden');

            // Simple validation
            if (name === "" || email === "" || message === "") {
                // If any field is empty, show error messages
                if (name === "") {
                    document.getElementById('name-error').classList.remove('hidden');
                }
                if (email === "") {
                    document.getElementById('email-error').classList.remove('hidden');
                }
                if (message === "") {
                    document.getElementById('message-error').classList.remove('hidden');
                }
            } else {
                // If all fields are filled, show a success message
                alert(`Thanks, ${name}! Form submitted successfully!`);
                // Reset the form
                document.querySelector('form').reset();
            }
        }
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Check if we already have a username
            const savedUsername = localStorage.getItem('portfolioUsername');
            if (savedUsername) {
                document.getElementById('username').textContent = savedUsername;
            } else {
                // Show welcome message if no username is saved
                welcomeMessage();
            }
            
            // Update navigation active state on scroll
            window.addEventListener('scroll', setActiveNavLink);
            
            // Set initial active state
            setActiveNavLink();
        });
        
        // Smooth scroll to section
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
        
        // Set active navigation link based on scroll position
        function setActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Update navigation links to use smooth scrolling
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });