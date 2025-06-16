// Supabase Integration for MatchAGig

// Supabase configuration - Replace with your actual Supabase credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// Initialize Supabase client
let supabase = null;

// Initialize Supabase when the script loads
function initSupabase() {
    try {
        if (typeof window.supabase !== 'undefined') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized successfully');
        } else {
            console.error('Supabase client not loaded. Please include the Supabase CDN script.');
        }
    } catch (error) {
        console.error('Error initializing Supabase:', error);
    }
}

// Submit signup data to Supabase
async function submitSignupData(formData) {
    if (!supabase) {
        console.error('Supabase not initialized');
        throw new Error('Database connection not available');
    }

    try {
        const signupData = {
            email: formData.email,
            full_name: formData.fullName,
            job_title: formData.jobTitle,
            company_name: formData.companyName || null,
            task_time_consumption: formData.taskTimeConsumption || null,
            current_tools_methods: formData.currentToolsMethods || null,
            preferred_challenge: formData.preferredChallenge || null,
            fair_monthly_price: formData.fairMonthlyPrice || null,
            beta_participation: formData.betaParticipation || null,
            signup_completed_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('beta_waitlist_signups')
            .insert([signupData])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        console.log('Signup data submitted successfully:', data);
        return data;
    } catch (error) {
        console.error('Error submitting signup data:', error);
        throw error;
    }
}

// Check if email already exists (optional validation)
async function checkEmailExists(email) {
    if (!supabase) {
        console.error('Supabase not initialized');
        return false;
    }

    try {
        const { data, error } = await supabase
            .from('beta_waitlist_signups')
            .select('email')
            .eq('email', email)
            .limit(1);

        if (error) {
            console.error('Error checking email:', error);
            return false;
        }

        return data && data.length > 0;
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load Supabase CDN script dynamically if not already loaded
    if (typeof window.supabase === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = initSupabase;
        script.onerror = function() {
            console.error('Failed to load Supabase CDN script');
        };
        document.head.appendChild(script);
    } else {
        initSupabase();
    }
});

// Export functions for use in other scripts
window.MatchAGigDB = {
    submitSignupData,
    checkEmailExists
}; 