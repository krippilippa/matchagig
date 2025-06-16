# Supabase Database Structure for MatchAGig.ai Interactive Sign-Up

## 🎯 Purpose
Define the Supabase database schema to securely store recruiter sign-up information and questionnaire responses collected via the MatchAGig.ai landing page.

## 📌 Database Tables and Fields

### Table: `beta_waitlist_signups`

| Column Name           | Data Type            | Description                                           |
|-----------------------|----------------------|-------------------------------------------------------|
| id                    | UUID (Primary Key)   | Unique identifier (auto-generated)                    |
| email                 | VARCHAR (required)   | Recruiter's email address                             |
| full_name             | VARCHAR (required)   | Recruiter's full name                                 |
| job_title             | VARCHAR (required)   | Recruiter's job title                                 |
| company_name          | VARCHAR (optional)   | Recruiter's company name                              |
| task_time_consumption | TEXT (optional)      | Response to Question 1                                |
| current_tools_methods | TEXT (optional)      | Response to Question 2                                |
| preferred_challenge   | VARCHAR (optional)   | Response to Question 3                                |
| fair_monthly_price    | VARCHAR (optional)   | Response to Question 4                                |
| beta_participation    | VARCHAR (optional)   | Response to Question 5                                |
| signup_completed_at   | TIMESTAMP (required) | Timestamp when signup and questionnaire were completed|
| created_at            | TIMESTAMP (auto)     | Timestamp of record creation (auto-generated)         |

## 🛠️ Notes for Implementation
- Ensure the database has appropriate indexing on `email` for quick lookups.
- Consider implementing constraints to ensure email uniqueness (if desired).
- Timestamp fields should use UTC time for consistency.
- Frontend must securely interact with Supabase using the Supabase client SDK and public keys.
- Utilize Supabase environment variables to securely manage API keys.
- Implement frontend validation to ensure required fields are properly filled before submission.

## 🔒 Security Considerations
- Use Supabase built-in authentication and Row-Level Security (RLS) policies to ensure only authorized backend systems (e.g., n8n) can insert or query this data.
- Sensitive information should always be encrypted at rest and transmitted securely via HTTPS.
- Configure appropriate CORS settings in Supabase to allow secure frontend interactions.

---

This detailed database structure supports efficient storage and retrieval of recruiter sign-up data, enabling easy integration with automation workflows (n8n) and outreach tools (e.g., Apollo).

