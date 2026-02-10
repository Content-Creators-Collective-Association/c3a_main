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
