# MPESA Integration Project

A complete mobile money payment integration system built with React (client) and Node.js/Express (server) that integrates with Safaricom's Daraja API for MPESA payments.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MPESA Daraja API credentials
- Pusher account (for real-time updates)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd MPESA_Integration

# Install server dependencies
cd server && npm install

# Install client dependencies  
cd ../client && npm install
```

### 2. Environment Setup
```bash
# Server environment
cd server
cp .env.example .env
# Edit .env with your MPESA credentials

# Client environment
cd ../client
cp .env.example .env
# Edit .env with your server URL
```

**Note:** Copy the `.env.example` files to `.env` and fill in your actual credentials. Never commit `.env` files to version control.

### 3. Start Development
```bash
# Terminal 1: Start server
cd server && npm run dev

# Terminal 2: Start client
cd client && npm run dev
```

## 🏗️ Architecture

```
MPESA_Integration/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── config/         # Axios configuration
│   │   └── hooks/          # Custom React hooks
│   └── README.md           # Client documentation
├── server/                 # Node.js backend
│   ├── services/           # MPESA integration logic
│   ├── routes/             # API endpoints
│   ├── utils/              # Utilities (phone validation, logging)
│   └── README.md           # Server documentation
└── README.md               # This file
```

## ✨ Key Features

### 🔐 **Secure Authentication**
- Server-side Daraja OAuth token management
- Client never sees sensitive credentials
- Automatic token refresh

### 📱 **Smart Phone Number Handling**
- Automatic Kenyan phone number formatting
- Supports multiple input formats
- Daraja API compliant output

### 🚀 **Automatic Server Warm-up**
- Client automatically opens server URL on load
- Gives server time to start up
- Smooth loading experience

### 📊 **Real-time Updates**
- Pusher integration for payment status
- Live payment progress updates
- Webhook handling for Daraja callbacks

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite
- **TypeScript/JSX** for type safety
- **Tailwind CSS** for styling
- **Axios** for HTTP requests

### Backend
- **Node.js** with Express
- **MPESA Daraja API** integration
- **Pusher** for real-time features
- **Structured logging** system

## 📚 Documentation

- **[Client README](client/README.md)** - Frontend setup and features
- **[Server README](server/README.md)** - Backend API and configuration
- **[MPESA Daraja API Docs](https://developer.safaricom.co.ke/)** - Official API reference

## 🔧 Configuration

### Environment Setup

The project includes `.env.example` files for both client and server. Copy these to `.env` and fill in your actual credentials:

```bash
# Server
cp server/.env.example server/.env

# Client  
cp client/.env.example client/.env
```

### Required Environment Variables

#### Server (.env)
```env
# MPESA Configuration
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey

# Pusher Configuration
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=mt1
```

#### Client (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
PUSHER_KEY=your_key
PUSHER_CLUSTER=mt1
```

### Getting Credentials

- **MPESA Daraja API**: [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
- **Pusher**: [Pusher Dashboard](https://dashboard.pusher.com/)

## 🧪 Testing

```bash
# Test phone number utility
cd server && npm test tests/phoneNumber.test.js

# Test payment endpoints
cd server && npm test tests/payment.test.js
```

## 🚀 Deployment

### Server
```bash
cd server
npm ci --only=production
NODE_ENV=production npm start
```

### Client
```bash
cd client
npm run build
# Deploy dist/ folder to your hosting service
```

## 📱 Supported Phone Formats

The system automatically handles these Kenyan phone number formats:
- `07XXXXXXXX` → `2547XXXXXXXX`
- `+2547XXXXXXXX` → `2547XXXXXXXX`
- `712345678` → `254712345678`
- `2547XXXXXXXX` → `2547XXXXXXXX` (already correct)

## 🔒 Security Features

- **No client-side credentials** - All sensitive data stays on server
- **Input validation** - Comprehensive validation for all inputs
- **CORS protection** - Configurable origin restrictions
- **Error sanitization** - No sensitive data leaked in errors
- **Structured logging** - Secure logging without sensitive info

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues or questions:
- Check the [server logs](server/logs/)
- Verify environment variables
- Ensure MPESA credentials are valid
- Check [server README](server/README.md) for troubleshooting

## 🔗 Links

- [Safaricom Daraja API](https://developer.safaricom.co.ke/)
- [Pusher Documentation](https://pusher.com/docs)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)