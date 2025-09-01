# MPESA Integration Client

## Features

### Automatic Server Warm-up
When the application loads, it automatically:
1. **Opens the server URL** (`VITE_API_BASE_URL`) in a new tab
2. **Gives the server 10 seconds** to start up and warm up
3. **Automatically closes** the tab after the warm-up period
4. **Shows a beautiful loading screen** during this process

### Loading Screen Experience
- **Animated MPESA logo** with rotating ring
- **Progress indicators** showing initialization steps
- **Server URL display** so users know what's happening
- **Smooth transitions** between loading and main app
- **Professional branding** with MPESA colors

## Environment Variables

Make sure to set `VITE_API_BASE_URL` in your `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## How It Works

1. **Page Load**: App starts with loading screen
2. **Server Warm-up**: Opens server URL in new tab (10 seconds)
3. **Loading Display**: Shows progress for 10 seconds total
4. **Smooth Transition**: Fades out loading screen
5. **Main App**: Payment form becomes available

## Technical Details

- **No client-side Daraja tokens**: Server handles all Daraja API authentication
- **Clean logging**: Production-ready with no debug console logs
- **Responsive design**: Built with Tailwind CSS
- **Type safety**: Written in TypeScript/JSX

This ensures your server has time to start up before users try to make payments, providing a much better user experience.
