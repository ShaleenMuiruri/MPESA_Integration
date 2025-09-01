# MPESA Integration Server

## Overview

A Node.js/Express server that integrates with the Safaricom Daraja API to process MPESA payments. The server handles STK Push requests, phone number validation, and provides a clean API for the client.

## Features

### 🏦 MPESA Integration
- **STK Push API**: Process mobile money payments
- **OAuth Authentication**: Automatic token management for Daraja API
- **Phone Number Validation**: Comprehensive Kenyan phone number formatting
- **Real-time Updates**: Pusher integration for payment status updates

### 📱 Phone Number Utility
- **Automatic Formatting**: Converts any Kenyan format to Daraja-compliant `254XXXXXXXXX`
- **Multiple Input Formats**: Supports `07XXXXXXXX`, `+254XXXXXXXX`, `254XXXXXXXX`
- **Built-in Validation**: Ensures phone numbers meet Daraja API requirements

### 🔐 Security & Authentication
- **Server-side Daraja Auth**: Client never sees Daraja credentials
- **CORS Configuration**: Configurable origin restrictions
- **Error Handling**: Comprehensive error management and logging

## API Endpoints

### `GET /api/payments/token`
Returns a fresh Daraja OAuth token for API requests.

**Response:**
```json
{
  "success": true,
  "auth_token": "your_daraja_token_here"
}
```

### `POST /api/payments/stkpush`
Initiates an STK Push payment request.

**Request Body:**
```json
{
  "amount": "100",
  "phoneNumber": "0712345678",
  "accountReference": "DONATION",
  "transactionDesc": "Payment description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "STK Push initiated successfully",
  "data": {
    "MerchantRequestID": "xxx",
    "CheckoutRequestID": "xxx",
    "ResponseCode": "0",
    "ResponseDescription": "Success. Request accepted for processing"
  }
}
```

### `POST /api/payments/callback`
Daraja webhook endpoint for payment status updates.

## Environment Variables

The project includes a `.env.example` file. Copy it to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### Required Variables

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# MPESA Configuration
MPESA_BASE_URL=https://sandbox.safaricom.co.ke
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
CALLBACK_URL=https://your-domain.com/api/payments/callback

# Pusher Configuration (for real-time updates)
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=mt1

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com
```

### Getting Credentials

- **MPESA Daraja API**: [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
- **Pusher**: [Pusher Dashboard](https://dashboard.pusher.com/)

## Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Environment Variables:**
   - Copy `.env.example` to `.env`
   - Fill in your MPESA and Pusher credentials

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Start Production Server:**
   ```bash
   npm start
   ```

## Phone Number Utility

The server includes a robust phone number utility that handles all common Kenyan formats:

```javascript
const { formatKenyanPhoneNumber, isValidKenyanPhoneNumber } = require('./utils/phoneNumber');

// Format any Kenyan phone number
const formatted = formatKenyanPhoneNumber('0712345678'); // Returns: 254712345678

// Validate phone number format
const isValid = isValidKenyanPhoneNumber('0712345678'); // Returns: true
```

### Supported Formats:
- `07XXXXXXXX` → `2547XXXXXXXX`
- `+2547XXXXXXXX` → `2547XXXXXXXX`
- `712345678` → `254712345678`
- `2547XXXXXXXX` → `2547XXXXXXXX` (already correct)

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/phoneNumber.test.js
```

## Project Structure

```
server/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middlewares/     # Express middlewares
├── models/          # Database models
├── routes/          # API route definitions
├── services/        # Business logic (MPESA integration)
├── utils/           # Utility functions (phone number, logging)
├── tests/           # Test files
└── app.js           # Express app configuration
```

## Logging

The server uses a structured logging system:
- **Development**: Console output with colors
- **Production**: File-based logging to `logs/` directory
- **Log Levels**: error, warn, info, debug

## Error Handling

- **Global Error Handler**: Catches all unhandled errors
- **Validation Errors**: Proper HTTP status codes for validation failures
- **MPESA Errors**: Detailed error messages from Daraja API
- **Structured Responses**: Consistent error response format

## Security Considerations

- **No Client Credentials**: Daraja credentials stay on server
- **Input Validation**: All inputs are validated before processing
- **CORS Protection**: Configurable origin restrictions
- **Error Sanitization**: No sensitive data leaked in error messages

## Deployment

1. **Set Production Environment:**
   ```bash
   export NODE_ENV=production
   ```

2. **Install Production Dependencies:**
   ```bash
   npm ci --only=production
   ```

3. **Start Server:**
   ```bash
   npm start
   ```

## Support

For issues or questions:
- Check the logs in `logs/` directory
- Verify environment variables are set correctly
- Ensure MPESA credentials are valid
- Check CORS configuration for client access
