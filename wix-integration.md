# Wix Integration Guide

This guide explains how to connect your Wix site to your external backend using Velo.

## 1. Calling Backend from Wix (Backend Code)
It is safer to call your external API from a Wix Backend file (`.jsw`) to avoid exposing your endpoint directly to the frontend if needed, though for simple testing you can call it from the frontend too.

**File: `backend/api.jsw`**
```javascript
import { fetch } from 'wix-fetch';

export async function getUsers() {
    const response = await fetch('https://your-project.vercel.app/api/users', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch users');
    }
}
```

## 2. Using in Frontend (Page Code)
**File: `Page Code`**
```javascript
import { getUsers } from 'backend/api.jsw';

$w.onReady(function () {
    getUsers()
        .then(users => {
            console.log('Users:', users);
            // Bind to repeaters, tables, etc.
        })
        .catch(err => {
            console.error(err);
        });
});
```

## 3. Troubleshooting CORS
If you see a CORS error in the browser console despite having `cors()` enabled in the backend:
1. Ensure you are using `fetch` in Wix Backend (`.jsw`) if possible, as server-to-server calls bypass browser CORS.
2. If calling directly from Frontend, ensure the `cors()` configuration in `app.js` is permissive or includes your Wix site origin.
   ```javascript
   app.use(cors({ origin: 'https://your-wix-site.com' }));
   ```
