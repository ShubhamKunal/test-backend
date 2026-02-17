# Deployment Documentation

This document provides step-by-step instructions for deploying the backend to Vercel.

## 1. Prerequisites
- A Vercel account ([vercel.com](https://vercel.com)).
- Vercel CLI installed (`npm i -g vercel`) OR your project pushed to GitHub/GitLab/Bitbucket.

## 2. Prepare for Deployment
Ensure your `package.json` has a `start` script or follows Vercel's zero-config for Express.
Vercel automatically detects the `server.js` or `index.js` as the entry point if it's in the root.

## 3. Deploy via GitHub (Recommended)
1. Push your code to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. **Environment Variables**: In the "Environment Variables" section, add the following:
   - `MONGO_URI`: Your MongoDB connection string.
   - `PORT`: `5000` (optional, Vercel handles this).
5. Click **Deploy**.

## 4. Deploy via CLI
1. Open your terminal in the project root.
2. Run `vercel`.
3. Follow the prompts to log in and set up the project.
4. To add environment variables via CLI:
   `vercel env add MONGO_URI`
5. Run `vercel --prod` to deploy to production.

## 5. Testing the Deployment
Once deployed, Vercel will provide a URL (e.g., `https://your-project.vercel.app`).
You can test it using `curl`:
```bash
curl https://your-project.vercel.app/api/users
```
