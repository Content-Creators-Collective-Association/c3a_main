approve-creator Edge Function

Purpose
- Approves a row in creator_profiles.
- Creates/links a Supabase Auth user for the profile email.
- Inserts a row into authenticated_user.
- Sends password setup email using Supabase recovery flow.

Deploy
1. Set function secrets:
  - SERVICE_ROLE_KEY=<your-service-role-key>
  - AUTH_REDIRECT_URL=https://your-site.com/auth
2. Deploy function:
  - supabase functions deploy approve-creator

Call payload
- POST body JSON:
  {
    "profileId": "<creator_profiles.id>"
  }

Response
- success=true when approval + auth linkage + email send are complete.

Notes
- This function uses SERVICE_ROLE_KEY internally in Edge Functions runtime.
- Call this from a trusted admin server/workflow only.
