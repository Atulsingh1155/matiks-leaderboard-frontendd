# 🏆 Leaderboard Frontend - React Native (Expo)

Mobile and web app for real-time leaderboard with search functionality.

## 🚀 Features

- ✅ Real-time leaderboard (auto-refresh every 5 seconds)
- ✅ User search with live global ranks
- ✅ Responsive UI with FlatList optimization
- ✅ Pull-to-refresh support
- ✅ Gold/Silver/Bronze medals for top 3
- ✅ Works on iOS, Android, and Web

## 📱 Screens

### 1. Leaderboard Screen
- Displays top 100 users
- Shows: Rank, Username, Rating
- Auto-refreshes every 5 seconds
- Pull down to manually refresh

### 2. Search Screen
- Search users by username
- Case-insensitive partial matching
- Shows live global rank for each result
- Multiple results sorted by rank

## 🛠️ Local Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on different platforms
# Press 'w' for web
# Press 'a' for Android
# Press 'i' for iOS
```

## 🔗 Configure Backend URL

Before deploying, update the backend API URL in:
- `screens/LeaderboardScreen.js` (line 13)
- `screens/SearchScreen.js` (line 13)

```javascript
// For local development
const API_URL = 'http://localhost:8080';

// For production (after deploying backend)
const API_URL = 'https://your-backend-url.com';
```

## 🚀 Deployment (Web)

### Build for Web:
```bash
npx expo export:web
```

### Deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=web-build
```

## 📊 Performance Optimizations

- **FlatList** for efficient rendering (handles 10k+ items)
- **Debounced search** to prevent excessive API calls
- **Auto-refresh** with background intervals
- **Memoized components** to avoid unnecessary re-renders

## 🎨 UI Components

### LeaderboardItem
- Displays rank, username, rating
- Gold/Silver/Bronze badges for top 3
- Color-coded rank badges

### SearchResult
- Shows global rank, username, rating
- Top 100 users get green badge
- Top 3 get gold/silver/bronze

## 📦 Tech Stack

- React Native 0.71.8
- Expo 48
- React Navigation 6
- Native FlatList

## 🔧 Troubleshooting

### Can't connect to backend:
1. Check backend is running
2. For mobile testing: Use computer's IP instead of localhost
3. Update API_URL in screen files

### No data showing:
1. Seed users first: `POST /seed?count=10000`
2. Refresh frontend

## 📄 License

Created for Matiks Full-Stack Engineer Internship Assignment.
