        // Enhanced Barangay Data Structure - WITHOUT NEWS, EVENTS, AND EMERGENCY
        const barangayData = {
            systemName: "BARANGAY 118 ONLINE SYSTEM",
            hero: {
                title: "Barangay 118 Online Management System",
                description: "Empowering our community through smart and efficient digital services."
            },
            welcomeSection: {
                backgroundImage: "8055825756095.png",
                title: "Welcome to Barangay 118",
                subtitle: "A Community of Unity and Progress",
                logo: "308673009_177778618128931_642779678020875763_n.png"
            },
            footer: {
                title: "Barangay 118 Online System",
                description: "Digital and efficient services for Barangay 118. Connecting our community through technology.",
                contactInfo: [
                    "Barangay 118 Hall, City Proper",
                    "Metro Manila, Philippines",
                    "(02) 8123-4567",
                    "info@barangay118.gov.ph",
                    "Mon-Fri: 8:00 AM - 5:00 PM"
                ],
                socialMedia: {
                    facebook: "https://www.facebook.com",
                    email: "mailto:barangay118@gmail.com"
                },
                copyright: "&copy; 2025 Barangay 118 Online System. All Rights Reserved."
            }
        };

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            loadData();
            setupEventListeners();
            updateUI();
            
            // Listen for storage changes (sync across tabs)
            window.addEventListener('storage', function(e) {
                if (e.key === 'barangayData') {
                    loadData();
                }
            });
        });

        // Load data from local storage or use default
        function loadData() {
            try {
                const savedData = localStorage.getItem('barangayData');
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    
                    // Deep merge to preserve all data including missing items
                    Object.keys(parsedData).forEach(key => {
                        if (Array.isArray(parsedData[key])) {
                            barangayData[key] = parsedData[key];
                        } else if (typeof parsedData[key] === 'object' && parsedData[key] !== null) {
                            Object.assign(barangayData[key], parsedData[key]);
                        } else {
                            barangayData[key] = parsedData[key];
                        }
                    });
                    
                    console.log(' Data loaded from local storage');
                } else {
                    console.log(' Using default data');
                }
            } catch (error) {
                console.error(' Error loading data:', error);
            }
            
            // Update the UI with the data
            updateUI();
        }

        // Save data to local storage
        function saveData() {
            try {
                localStorage.setItem('barangayData', JSON.stringify(barangayData));
                console.log(' Data saved to local storage');
                return true;
            } catch (error) {
                console.error(' Error saving data:', error);
                return false;
            }
        }

        // Update the UI with current data
        function updateUI() {
            try {
                // System name
                if (document.getElementById('system-name')) {
                    document.getElementById('system-name').textContent = barangayData.systemName;
                }

                // Hero section
                if (document.getElementById('hero-title')) {
                    document.getElementById('hero-title').textContent = barangayData.hero.title;
                }
                if (document.getElementById('hero-description')) {
                    document.getElementById('hero-description').textContent = barangayData.hero.description;
                }

                // Welcome Section
                const welcomeBackground = document.getElementById('welcome-background');
                if (welcomeBackground && barangayData.welcomeSection.backgroundImage) {
                    welcomeBackground.style.backgroundImage = `url(${barangayData.welcomeSection.backgroundImage})`;
                }
                
                if (document.getElementById('welcome-title')) {
                    document.getElementById('welcome-title').textContent = barangayData.welcomeSection.title;
                }
                if (document.getElementById('welcome-subtitle')) {
                    document.getElementById('welcome-subtitle').textContent = barangayData.welcomeSection.subtitle;
                }
                
                const barangayLogo = document.getElementById('barangay-logo-img');
                if (barangayLogo && barangayData.welcomeSection.logo) {
                    barangayLogo.src = barangayData.welcomeSection.logo;
                }

                // Footer
                renderFooter();

                console.log(' UI updated successfully');
            } catch (error) {
                console.error(' Error updating UI:', error);
            }
        }

        // Render footer
        function renderFooter() {
            if (document.getElementById('footer-title')) {
                document.getElementById('footer-title').textContent = barangayData.footer.title;
            }
            if (document.getElementById('footer-description')) {
                document.getElementById('footer-description').textContent = barangayData.footer.description;
            }
            
            const facebookLink = document.getElementById('facebook-link');
            if (facebookLink && barangayData.footer.socialMedia) {
                facebookLink.href = barangayData.footer.socialMedia.facebook;
            }
            
            const emailLink = document.getElementById('email-link');
            if (emailLink && barangayData.footer.socialMedia) {
                emailLink.href = barangayData.footer.socialMedia.email;
            }
            
            if (document.getElementById('copyright-text')) {
                document.getElementById('copyright-text').innerHTML = barangayData.footer.copyright;
            }

            // Contact info
            const contactList = document.getElementById('footer-contact-info');
            if (contactList && barangayData.footer.contactInfo) {
                contactList.innerHTML = '';
                barangayData.footer.contactInfo.forEach(info => {
                    const listItem = document.createElement('li');
                    
                    if (info.includes('Barangay') || info.includes('Hall')) {
                        listItem.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${info}`;
                    } else if (info.includes('Metro Manila')) {
                        listItem.innerHTML = `<i class="fas fa-map-pin"></i> ${info}`;
                    } else if (info.includes('(') && info.includes(')')) {
                        listItem.innerHTML = `<i class="fas fa-phone"></i> ${info}`;
                    } else if (info.includes('@')) {
                        listItem.innerHTML = `<i class="fas fa-envelope"></i> ${info}`;
                    } else if (info.includes('AM') || info.includes('PM')) {
                        listItem.innerHTML = `<i class="fas fa-clock"></i> ${info}`;
                    } else {
                        listItem.innerHTML = `<i class="fas fa-info-circle"></i> ${info}`;
                    }
                    
                    contactList.appendChild(listItem);
                });
            }
        }

        // Set up event listeners
        function setupEventListeners() {
            // No event listeners needed since news, events, and emergency sections are removed
        }

        // Admin Functions
        function updateSystemName(newName) {
            barangayData.systemName = newName;
            saveData();
            updateUI();
        }

        function updateHeroSection(title, description) {
            barangayData.hero.title = title;
            barangayData.hero.description = description;
            saveData();
            updateUI();
        }

        function updateWelcomeSection(backgroundImage, title, subtitle, logo) {
            barangayData.welcomeSection.backgroundImage = backgroundImage;
            barangayData.welcomeSection.title = title;
            barangayData.welcomeSection.subtitle = subtitle;
            barangayData.welcomeSection.logo = logo;
            saveData();
            updateUI();
        }

        function updateFooter(newFooter) {
            barangayData.footer = newFooter;
            saveData();
            updateUI();
        }

        // Export admin functions
        window.barangayAdmin = {
            updateSystemName,
            updateHeroSection,
            updateWelcomeSection,
            updateFooter,
            getData: () => barangayData,
            saveData,
            loadData
        };

        // Enhanced Manual Save Function
        function manualSave() {
            const success = saveData();
            if (success) {
                showNotification('Changes saved successfully!', 'success');
            } else {
                showNotification('Error saving changes', 'error');
            }
        }

        // Reset to Default Data
        function resetToDefault() {
            if (confirm('Are you sure you want to reset to default data?')) {
                const defaultData = {
                    systemName: "BARANGAY 118 ONLINE SYSTEM",
                    hero: {
                        title: "Barangay 118 Online Management System",
                        description: "Empowering our community through smart and efficient digital services."
                    },
                    welcomeSection: {
                        backgroundImage: "/Users/nuel/Desktop/Capstone2/received_32392388620408695_edit_2410797689912.png",
                        title: "Welcome to Barangay 118",
                        subtitle: "A Community of Unity and Progress",
                        logo: "308673009_177778618128931_642779678020875763_n.png"
                    },
                    footer: {
                        title: "Barangay 118 Online System",
                        description: "Digital and efficient services for Barangay 118.",
                        contactInfo: [
                            "Barangay 118 Hall, City Proper",
                            "Metro Manila, Philippines",
                            "(02) 8123-4567",
                            "info@barangay118.gov.ph",
                            "Mon-Fri: 8:00 AM - 5:00 PM"
                        ],
                        socialMedia: {
                            facebook: "https://www.facebook.com",
                            email: "mailto:barangay118@gmail.com"
                        },
                        copyright: "&copy; 2025 Barangay 118 Online System. All Rights Reserved."
                    }
                };
                
                Object.keys(defaultData).forEach(key => {
                    barangayData[key] = defaultData[key];
                });
                
                saveData();
                updateUI();
                showNotification('Reset to default data successful!', 'success');
            }
        }

        // Notification System
        function showNotification(message, type = 'info') {
            // Remove existing notification
            const existingNotification = document.getElementById('custom-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            const notification = document.createElement('div');
            notification.id = 'custom-notification';
            notification.innerHTML = `
                <div style="position: fixed; top: 20px; right: 20px; padding: 15px 20px; border-radius: 8px; color: white; font-weight: 600; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 10px; max-width: 400px;">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            // Set background color based on type
            const notificationDiv = notification.querySelector('div');
            if (type === 'success') {
                notificationDiv.style.backgroundColor = '#10b981';
            } else if (type === 'error') {
                notificationDiv.style.backgroundColor = '#ef4444';
            } else {
                notificationDiv.style.backgroundColor = '#3b82f6';
            }
            
            document.body.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        }

        // Enhanced Admin Functions with Manual Save
        window.barangayAdmin = {
            updateSystemName: function(newName) {
                barangayData.systemName = newName;
                manualSave();
                updateUI();
            },
            updateHeroSection: function(title, description) {
                barangayData.hero.title = title;
                barangayData.hero.description = description;
                manualSave();
                updateUI();
            },
            updateWelcomeSection: function(backgroundImage, title, subtitle, logo) {
                barangayData.welcomeSection.backgroundImage = backgroundImage;
                barangayData.welcomeSection.title = title;
                barangayData.welcomeSection.subtitle = subtitle;
                barangayData.welcomeSection.logo = logo;
                manualSave();
                updateUI();
            },
            updateFooter: function(newFooter) {
                barangayData.footer = newFooter;
                manualSave();
                updateUI();
            },
            getData: () => barangayData,
            saveData: manualSave,
            loadData: loadData,
            manualSave: manualSave,
            resetToDefault: resetToDefault
        };

        console.log(' Barangay Admin System Connected - Ready for Admin Panel Integration');