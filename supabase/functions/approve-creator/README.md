approve-creator Edge Function

Purpose
- Approves a row in creator_profiles.
- Creates/links a Supabase Auth user for the profile email.
- Inserts a row into approved_users.
- Returns a login password that can be shared with the approved creator.

Deploy
1. Set function secrets:
  - SERVICE_ROLE_KEY=<your-service-role-key>
2. Deploy function:
  - supabase functions deploy approve-creator

Call payload
- POST body JSON:
  {
    "profileId": "<creator_profiles.id>",
    "password": "<optional-password>"
  }

Response
- success=true when approval + auth linkage + login password creation are complete.

Notes
- This function uses SERVICE_ROLE_KEY internally in Edge Functions runtime.
- Call this from a trusted admin server/workflow only.
- The password is stored in Supabase Auth, not in the approved_users table.
