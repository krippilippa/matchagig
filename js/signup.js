// Interactive Signup Flow for MatchAGig

class SignupFlow {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 6; // initial + 5 questions
        this.formData = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        // Initial form submission
        const initialForm = document.getElementById('initialForm');
        if (initialForm) {
            initialForm.addEventListener('submit', (e) => this.handleInitialForm(e));
        }

        // Handle input changes for auto-save
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea')) {
                this.saveFormData(e.target);
            }
        });

        // Handle radio button changes
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[type="radio"]')) {
                this.saveFormData(e.target);
            }
        });
    }

    handleInitialForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate required fields
        const email = formData.get('email');
        const fullName = formData.get('fullName');
        const jobTitle = formData.get('jobTitle');
        
        if (!email || !fullName || !jobTitle) {
            this.showError('Please fill in all required fields');
            return;
        }

        // Validate email format
        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        // Save initial data
        this.formData.email = email;
        this.formData.fullName = fullName;
        this.formData.jobTitle = jobTitle;
        this.formData.companyName = formData.get('companyName') || '';

        // Move to first question
        this.nextStep();
    }

    saveFormData(input) {
        const name = input.name;
        const value = input.value;
        
        if (name) {
            this.formData[name] = value;
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps - 1) {
            this.hideCurrentStep();
            this.currentStep++;
            this.showCurrentStep();
            this.updateProgress();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.hideCurrentStep();
            this.currentStep--;
            this.showCurrentStep();
            this.updateProgress();
        }
    }

    hideCurrentStep() {
        const currentStepElement = this.getCurrentStepElement();
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
    }

    showCurrentStep() {
        const currentStepElement = this.getCurrentStepElement();
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            // Smooth scroll to top of form
            currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    getCurrentStepElement() {
        if (this.currentStep === 0) {
            return document.getElementById('step-initial');
        } else if (this.currentStep <= 5) {
            return document.getElementById(`step-${this.currentStep}`);
        } else if (this.currentStep === 6) {
            return document.getElementById('step-thank-you');
        }
        return null;
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            const progressPercentage = ((this.currentStep + 1) / this.totalSteps) * 100;
            progressFill.style.width = `${progressPercentage}%`;
            
            if (this.currentStep === 0) {
                progressText.textContent = 'Step 1 of 6';
            } else if (this.currentStep <= 5) {
                progressText.textContent = `Question ${this.currentStep} of 5`;
            } else {
                progressText.textContent = 'Complete!';
            }
        }
    }

    async submitForm() {
        // Validate that we have all required data
        if (!this.formData.email || !this.formData.fullName || !this.formData.jobTitle) {
            this.showError('Missing required information. Please go back and fill in all required fields.');
            return;
        }

        // Show loading overlay
        this.showLoading(true);

        try {
            // Submit to Supabase
            if (window.MatchAGigDB && window.MatchAGigDB.submitSignupData) {
                await window.MatchAGigDB.submitSignupData(this.formData);
                
                // Success - show thank you page
                this.hideCurrentStep();
                this.currentStep = 6; // Thank you step
                this.showCurrentStep();
                this.updateProgress();
            } else {
                // Fallback - just show thank you (for testing without Supabase)
                console.log('Form data would be submitted:', this.formData);
                this.hideCurrentStep();
                this.currentStep = 6;
                this.showCurrentStep();
                this.updateProgress();
            }
        } catch (error) {
            console.error('Submission error:', error);
            this.showError('There was an error submitting your information. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            if (show) {
                loadingOverlay.classList.add('active');
            } else {
                loadingOverlay.classList.remove('active');
            }
        }
    }

    showError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                background-color: #fee;
                color: #c33;
                padding: 12px 16px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #fcc;
                font-weight: 500;
            `;
            
            const currentStep = this.getCurrentStepElement();
            if (currentStep) {
                currentStep.insertBefore(errorDiv, currentStep.firstChild);
            }
        }
        
        errorDiv.textContent = message;
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv && errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Global functions for button onclick handlers
function nextStep() {
    if (window.signupFlow) {
        window.signupFlow.nextStep();
    }
}

function previousStep() {
    if (window.signupFlow) {
        window.signupFlow.previousStep();
    }
}

function submitForm() {
    if (window.signupFlow) {
        window.signupFlow.submitForm();
    }
}

// Initialize signup flow when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.signupFlow = new SignupFlow();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.matches('input:not([type="submit"])')) {
            e.preventDefault();
            nextStep();
        }
    });
}); 