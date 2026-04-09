# task-manager-mobile

React Native app (iOS + Android) for the Task Manager. Mobile-first quick capture with speech-to-text, offline support, and Google Calendar sync.

## Prerequisites

- Node.js 18+, Yarn
- React Native development environment: https://reactnative.dev/docs/environment-setup
  - **Android:** Android Studio + Android SDK
  - **iOS (Mac only):** Xcode + CocoaPods
- A GitHub Personal Access Token with `read:packages` scope (to install `@noctilumina/task-manager-shared` from GitHub Packages)

## First-time setup

### 1. Create your .env file

```powershell
cd C:\Users\irisp\task-manager-mobile
copy .env.example .env
```

Open `.env` and fill in your values. Find Firebase config at **https://console.firebase.google.com/project/task-manager-79da0/settings/general** → Your apps → Web app:

```
FIREBASE_API_KEY=AIza...
FIREBASE_AUTH_DOMAIN=task-manager-79da0.firebaseapp.com
FIREBASE_PROJECT_ID=task-manager-79da0
FIREBASE_STORAGE_BUCKET=task-manager-79da0.appspot.com
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
GOOGLE_WEB_CLIENT_ID=....apps.googleusercontent.com
N8N_WEBHOOK_URL=http://localhost:5678
```

Find `GOOGLE_WEB_CLIENT_ID` at **https://console.cloud.google.com/apis/credentials?project=task-manager-79da0** — copy the Client ID from the "Web client (auto created by Google Service)" entry.

### 2. Set your GitHub token for package install

```powershell
$env:GITHUB_TOKEN="your_github_pat_here"
```

### 3. Install dependencies

```powershell
yarn install
```

### 4. Install iOS pods (Mac only)

```bash
cd ios && pod install && cd ..
```

### 5. Run the app

**Android:**
```powershell
yarn android
```

**iOS (Mac only):**
```bash
yarn ios
```

## Running the Metro bundler separately

```powershell
yarn start
```

## Running tests

```powershell
yarn test
```

## Project structure

```
src/
├── screens/          LoginScreen, TaskListScreen, TaskDetailScreen, SettingsScreen
├── components/       TaskCard, TaskInput, SpeechToTextButton, SortOptionsMenu, SyncStatusIndicator
├── hooks/            useTasks, useSync
├── navigation/       AppNavigator (stack navigator)
├── App.tsx           Root component — auth state listener
└── firebase.config.ts  Firebase initialisation
```

## Key dependencies

| Package | Purpose |
|---------|---------|
| `@noctilumina/task-manager-shared` | Shared business logic (TaskService, SyncService, types) |
| `@react-native-firebase/auth` | Firebase Google OAuth |
| `@react-native-firebase/firestore` | Firestore real-time sync |
| `@react-native-voice/voice` | Speech-to-text |
| `@react-navigation/stack` | Screen navigation |
| `react-native-sqlite-storage` | Local offline SQLite store |
