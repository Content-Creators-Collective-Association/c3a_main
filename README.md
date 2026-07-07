This is the folder that contains the production build output created by npm run build.

Deployment Configuration
For Netlify:
Base directory: Leave empty or set to /
Build command: npm run build
Publish directory: dist
For Vercel:
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
For GitHub Pages or other static hosts:
Simply upload the contents of the dist/ folder to your web server.

Quick Deployment Steps
Netlify (easiest):

Connect your GitHub repository (https://github.com/arya-p-gh/c3a_land)
Netlify will auto-detect Vite and configure:
Build command: npm run build
Publish directory: dist
Click "Deploy"
Vercel:

Import your GitHub repository
Vercel will auto-detect Vite settings
Click "Deploy"
Both platforms will automatically rebuild and redeploy whenever you push changes to the main branch.

The current build output shows:

Total size: ~187 KB (gzipped: ~57 KB)
HTML: 0.96 KB
CSS: 21.41 KB (gzipped: 4.90 KB)
JS: 164.70 KB (gzipped: 51.82 KB)
This is an excellent bundle size for a production-ready landing page! 🚀

Supabase Form Integration
1. Copy [.env.example](.env.example) to `.env.local`.
2. Add your Supabase values:
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`
	- `VITE_SUPABASE_TABLE` (optional, defaults to `creator_applications`)
3. In Supabase, create a table (default: `creator_applications`) with columns:
	- `name` (text)
	- `email` (text)
	- `platform` (text)
	- `follower_range` (text)
	- `profile_url` (text)
	- `terms_accepted` (boolean)
4. Enable insert access with an RLS policy for your chosen usage pattern.

Approval -> Auth Provisioning Workflow
1. Apply SQL migration in [supabase/migrations/20260513_creator_approval_auth_workflow.sql](supabase/migrations/20260513_creator_approval_auth_workflow.sql).
2. Deploy the approval function from [supabase/functions/approve-creator/index.ts](supabase/functions/approve-creator/index.ts):
	- `supabase functions deploy approve-creator`
3. Set the function secret:
	- `SERVICE_ROLE_KEY=<your-service-role-key>`
4. When you approve a creator profile, call `approve-creator` with `profileId`.
5. The function will:
	- create or update a Supabase Auth user,
	- create or update a row in `approved_users`,
	- mark the profile as approved,
	- return the generated login password so you can share it securely.

Important
- A Supabase Auth password cannot be created safely from the browser or SQL alone.
- If you do not want Edge Functions, you need some trusted backend/server-side code with the service role key.
- Do not store the plaintext password in a public table; let Supabase Auth own the password and keep only the auth user id in `approved_users`.

Production checklist
1. In Supabase, run the migration before deploying the function.
2. Confirm `creator_profiles.email` is populated for every row you might approve.
3. Deploy the Edge Function only from a trusted environment.
4. Keep `SERVICE_ROLE_KEY` in Supabase secrets, never in the frontend.
5. Use the function response password once, then share it through a secure admin channel.
6. After approval, creators log in with the email/password created by the function and land on the dashboard in the app.
7. If you need stricter security, replace the generated password flow with a forced password-reset flow handled by your own admin portal, but keep the same `approved_users` table.
