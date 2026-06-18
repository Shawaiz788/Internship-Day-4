# Expo Circular Slider (Expo Router)

This is an **Expo** + **React Native** project (using **Expo Router**) that renders a circular/zooming image slider component.


https://github.com/user-attachments/assets/f2d8cf01-4a84-480e-8d04-1568942e7703


## What you’re seeing
- `app/index.tsx` renders the page content.
- `app/CircularSlider.tsx` exports the `CircularSlider` component.
  - It uses a horizontal `Animated.FlatList` with `snapToInterval` to move between items.
  - `react-native-reanimated` drives animations:
    - the active item gets a highlighted border (via `interpolateColor`)
    - items translate slightly on the Y axis
  - The background image swaps based on the currently active index.

## Prerequisites
- **Node.js** installed (includes `npm`)
- (Recommended) Android Studio / iOS simulator if you want platform builds

## Get started
### 1) Install dependencies
From the project folder:

```bash
cd my-app
npm install
```

### 2) Start the development server
```bash
npx expo start
```

Then use one of the options shown in the terminal:
- **Expo Go** (fastest): scan the QR code with the Expo Go app
- **Android**: press the Android option
- **iOS**: press the iOS option (macOS required)
- **Web**: press the web option

## Helpful scripts
From `my-app/`:

- Start:
  ```bash
  npm run start
  ```
- Android:
  ```bash
  npm run android
  ```
- iOS:
  ```bash
  npm run ios
  ```
- Web:
  ```bash
  npm run web
  ```

## Project structure (relevant files)
- `app/_layout.tsx`
  - Expo Router setup (routes + `headerShown: false`).
- `app/index.tsx`
  - Page entry that renders `<CircularSlider />`.
- `app/CircularSlider.tsx`
  - The circular slider implementation.

## Reset project (if needed)
This project includes a helper script:

```bash
npm run reset-project
```

## Notes
- The slider uses remote placeholder images from `picsum.photos`.
- If you change the images, update the `images` array inside `app/CircularSlider.tsx`.

