const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// OAuth start route (can also be hardcoded in frontend)
app.get('/oauth/start', (req, res) => {
  const state = Math.random().toString(36).substring(2, 15);
  const params = new URLSearchParams({
    client_id: '8f223305-ba91-4a6d-a188-46eee4c33296',
    redirect_uri: 'http://localhost:3000/oauth2/callback',
    response_type: 'code',
    scope: 'openid profile email',
    prompt: 'select_account',
    hd: '*',
    state
  });

  const authUrl = `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?${params.toString()}`;
  res.redirect(authUrl);
});

// Callback route served to Microsoft
app.get('/oauth2/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'callback.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
