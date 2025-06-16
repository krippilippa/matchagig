# MatchAGig.ai Landing Page & Signup Flow

A market validation website for MatchAGig.ai - an AI-powered platform concept for recruiters to instantly match resumes with job descriptions.

## 🚀 Project Overview

This is a pure HTML/CSS/JavaScript implementation of:
- **Landing Page**: Showcasing the MatchAGig.ai concept and benefits
- **Interactive Signup Flow**: Multi-step questionnaire for beta waitlist
- **Supabase Integration**: Store signup data and questionnaire responses

## 📁 File Structure

```
/matchagig/
├── index.html              # Main landing page
├── signup.html             # Interactive signup flow
├── css/
│   └── styles.css          # All styling for both pages
├── js/
│   ├── main.js            # Landing page interactions
│   ├── signup.js          # Signup flow logic
│   └── supabase.js        # Database integration
└── assets/                # Future images/icons
```

## 🛠️ Setup Instructions

### 1. Basic Setup
1. Clone or download this project
2. Open `index.html` in a web browser to view the landing page
3. Click "Join Beta Waitlist" to test the signup flow

### 2. Supabase Integration
To enable database functionality:

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your Project URL and API Key

2. **Set up the Database**:
   - In Supabase dashboard, go to SQL Editor
   - Create the `beta_waitlist_signups` table:
   ```sql
   CREATE TABLE beta_waitlist_signups (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       email VARCHAR NOT NULL,
       full_name VARCHAR NOT NULL,
       job_title VARCHAR NOT NULL,
       company_name VARCHAR,
       task_time_consumption TEXT,
       current_tools_methods TEXT,
       preferred_challenge VARCHAR,
       fair_monthly_price VARCHAR,
       beta_participation VARCHAR,
       signup_completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Configure Credentials**:
   - Open `js/supabase.js`
   - Replace `YOUR_SUPABASE_URL_HERE` with your Project URL
   - Replace `YOUR_SUPABASE_ANON_KEY_HERE` with your API Key

### 3. Deployment Options

**Option 1: Static Hosting**
- Deploy to Netlify, Vercel, or GitHub Pages
- All files are static and can be hosted anywhere

**Option 2: Local Development**
- Use a local server (e.g., `python -m http.server` or Live Server extension)
- Required for Supabase integration due to CORS policies

## 🎨 Design Specifications

- **Colors**: Deep blue (#0057e7), White (#ffffff), Yellow accent (#fbbc05)
- **Typography**: Inter font family
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hover effects

## 🔧 Features

### Landing Page
- ✅ Hero section with clear value proposition
- ✅ Problem/solution sections
- ✅ "How it works" overview
- ✅ Benefits highlight
- ✅ Responsive design
- ✅ Smooth animations

### Signup Flow
- ✅ Initial form (email, name, job title, company)
- ✅ 5-question interactive questionnaire
- ✅ Progress indicators
- ✅ Form validation
- ✅ Smooth step transitions
- ✅ Loading states
- ✅ Thank you page

### Database Integration
- ✅ Supabase connection
- ✅ Form data submission
- ✅ Error handling
- ✅ Email validation
- ✅ Data mapping to database schema

## 🎯 Usage

1. **Landing Page**: Visit `index.html` to see the main marketing page
2. **Signup Flow**: Click "Join Beta Waitlist" to start the interactive signup
3. **Data Collection**: All form responses are stored in Supabase (when configured)

## 📊 Metrics & Analytics

The system is ready for analytics integration:
- CTA button clicks are tracked in console
- Form completion rates can be monitored
- Questionnaire responses provide market insights

## 🔒 Security

- All data transmission uses HTTPS
- Supabase handles authentication and data security
- Input validation prevents malicious submissions
- No sensitive data stored in client-side code

## 🚀 Next Steps

1. **Configure Supabase** with your credentials
2. **Test the full flow** from landing page to thank you
3. **Deploy to production** hosting
4. **Add analytics** (Google Analytics, Mixpanel, etc.)
5. **Set up automation** with n8n for CRM integration

## 📝 Customization

To customize the content:
- Edit text directly in `index.html` and `signup.html`
- Modify colors and styles in `css/styles.css`
- Adjust form questions in `signup.html`
- Update database schema in Supabase if needed

## 🐛 Troubleshooting

**Common Issues**:
- **CORS errors**: Use a local server instead of opening files directly
- **Supabase not connecting**: Check your URL and API key in `js/supabase.js`
- **Form not submitting**: Check browser console for error messages
- **Styling issues**: Ensure `css/styles.css` is loading properly

## 📧 Support

For questions or issues, check the browser console for error messages and ensure all files are properly linked. 