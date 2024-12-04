# Foodible Restaurant Discovery Platform

## Google Maps Integration Setup

### Prerequisites
- Google Cloud Platform Account
- Google Maps API Key

### Steps to Set Up Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing project
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API

4. Create an API Key
   - Go to "Credentials"
   - Click "Create Credentials" > "API Key"
   - Restrict the API key to your application's domains

5. Set Up Environment Variables
   - Create a `.env` file in the project root
   - Add your API key:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

### Security Recommendations
- Restrict API key usage in Google Cloud Console
- Use environment variables to keep the key secret
- Never commit API keys directly to version control

### Troubleshooting
- Check browser console for any API-related errors
- Verify API key permissions and restrictions
- Ensure billing is enabled for your Google Cloud project

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```
