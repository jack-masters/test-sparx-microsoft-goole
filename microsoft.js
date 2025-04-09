const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configuration - no server-side OAuth needed for this approach
const config = {
  clientId: '8f223305-ba91-4a6d-a188-46eee4c33296',
  sparxCallback: 'https://auth.sparx-learning.com/oauth2/callback'
};

// Serve the bypass page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Optional: Endpoint to get the auth URL (if you want to construct it server-side)
app.get('/auth-url', (req, res) => {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.sparxCallback,
    response_type: 'token',
    scope: 'openid profile email',
    prompt: 'select_account'
  });
  
  const authUrl = `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?${params}`;
  res.json({ authUrl });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});