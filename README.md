# React Native Movie App 🎬

A modern, cross-platform mobile application built with React Native and Expo that allows users to discover, search, and explore movies using The Movie Database (TMDB) API. The app features trending movie tracking powered by Appwrite backend.

## ✨ Features

- **Movie Discovery**: Browse popular and latest movies in a beautiful grid layout
- **Trending Movies**: View the top 5 most searched movies based on user activity
- **Movie Search**: Real-time search functionality with debounced API calls
- **Movie Details**: Comprehensive movie information including budget, revenue, genres, and production companies
- **Cross-Platform**: Works on iOS, Android, and Web
- **Modern UI**: Built with NativeWind (Tailwind CSS) for a sleek, responsive design
- **Performance Optimized**: Uses FlatList virtualization for efficient rendering

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) ~54.0.25
- **React Native**: 0.81.5
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS)
- **Backend**: [Appwrite](https://appwrite.io/) (for trending movies tracking)
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **Language**: TypeScript
- **State Management**: Custom hooks (`useFetch`)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (for macOS) or Android Emulator
- [Appwrite](https://appwrite.io/) account and project setup

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react_native_movie_app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# TMDB API Configuration
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here

# Appwrite Configuration
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_APPWRITE_TABLE_ID=your_table_id
```

**Getting API Keys:**

1. **TMDB API Key**: 
   - Sign up at [TMDB](https://www.themoviedb.org/settings/api)
   - Create an API key from your account settings

2. **Appwrite Setup**:
   - Create an account at [Appwrite Cloud](https://cloud.appwrite.io/) or set up a self-hosted instance
   - Create a new project
   - Create a database and collection with the following attributes:
     - `searchTerm` (String)
     - `movie_id` (Integer)
     - `title` (String)
     - `count` (Integer)
     - `poster_url` (String)

### 4. Start the Development Server

```bash
npm start
```

This will start the Expo development server. You can then:

- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your device

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start in web browser
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
react_native_movie_app/
├── app/                    # Expo Router file-based routing
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   ├── saved.tsx      # Saved movies (placeholder)
│   │   └── profile.tsx    # User profile (placeholder)
│   ├── movies/
│   │   └── [id].tsx       # Movie details screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── MovieCard.tsx      # Movie card component
│   ├── TrendingCard.tsx   # Trending movie card
│   └── SearchBar.tsx      # Search input component
├── services/              # API and service layer
│   ├── api.ts            # TMDB API calls
│   ├── appwrite.ts       # Appwrite backend integration
│   └── useFetch.ts       # Custom data fetching hook
├── constants/            # App constants
│   ├── icons.ts          # Icon references
│   └── images.ts         # Image references
├── interfaces/           # TypeScript type definitions
└── assets/              # Static assets (images, fonts)
```

## 🎨 Key Features Explained

### Trending Movies

The app tracks user search behavior using Appwrite. When users search for movies, the search count is incremented in the database. The top 5 most searched movies are displayed on the home screen as "Trending Movies".

### Movie Search

The search functionality includes:
- Debounced API calls (500ms delay) to reduce unnecessary requests
- Real-time results as you type
- Automatic search count tracking for trending movies

### Performance Optimizations

- **FlatList Virtualization**: Used instead of ScrollView for efficient rendering of large lists
- **ListHeaderComponent**: Properly implemented to avoid nested scrollable components
- **Image Optimization**: Uses Expo Image for optimized image loading

## 🔧 Configuration

### App Configuration

The app configuration is managed in `app.json`. Key settings include:
- App name and slug
- Icon and splash screen
- Platform-specific settings (iOS, Android, Web)
- Expo Router configuration

### Styling

The app uses NativeWind (Tailwind CSS) for styling. Configuration is in `tailwind.config.js`. The app follows a consistent color scheme defined in the config.

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**:
   ```bash
   npx expo start -c
   ```

2. **Module resolution errors**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Appwrite connection errors**:
   - Verify your Appwrite endpoint and project ID
   - Check that your database and collection IDs are correct
   - Ensure your Appwrite project has the correct permissions

4. **TMDB API errors**:
   - Verify your API key is correct
   - Check your API key permissions on TMDB
   - Ensure you haven't exceeded rate limits

## 📝 Development Notes

- The app uses Expo Router's file-based routing system
- TypeScript is used throughout for type safety
- The app follows React Native best practices for performance
- Custom hooks are used for data fetching and state management

## 🤝 Contributing

This is a demo project. Feel free to fork and modify as needed.

## 📄 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- [Appwrite](https://appwrite.io/) for backend services
- [Expo](https://expo.dev/) for the amazing development platform

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Appwrite Documentation](https://appwrite.io/docs)
