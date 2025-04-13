# Contest Management System

A robust backend system for managing online contests, built with Node.js, Express, TypeScript, and Redis.

## Features

- Contest creation and management
- User registration and authentication
- Submission handling with queue processing
- Real-time contest data updates
- Secure API endpoints with JWT authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Redis](https://redis.io/) (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cgs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Port on which the server will run
   PORT=4000

   # Comma-separated list of allowed origins for CORS
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002

   # Redis connection settings
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # HTTP/HTTPS configuration
   # Set to true to enable HTTPS, false for HTTP
   HTTPS=false
   # Port for HTTPS connections (if enabled)
   HTTPS_PORT=443
   # Path to SSL key file (if HTTPS is enabled)
   SSL_KEY_PATH=./ssl/key.pem
   # Path to SSL certificate file (if HTTPS is enabled)
   SSL_CERT_PATH=./ssl/cert.pem

   # Base URL for the application (typically the frontend URL)
   BASE_URL=http://localhost:4000

   # Secret key for JWT token generation and validation
   # IMPORTANT: Change this to a secure random string in production
   JWT_SECRET=your_secure_jwt_secret_here
   ```

4. If you want to use HTTPS (optional):
   - Set `HTTPS=true` in your `.env` file
   - Create an `ssl` directory in the project root
   - Generate self-signed certificates for development:
     ```bash
     mkdir ssl
     cd ssl
     openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
     ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 4000).

### Production Build

To build the application for production:

```bash
npm run build
```

This will compile TypeScript files to JavaScript in the `dist` directory.

### Running in Production

After building, you can run the production version:

```bash
node dist/server.js
```

## API Endpoints

### Contest Routes

- **GET /api/v1/contest** - Get contest information
- **POST /api/v1/contest/create** - Create a new contest
- **POST /api/v1/contest/login** - Login to a contest
- **POST /api/v1/contest/submit** - Submit contest answers

## Architecture

### Key Components

1. **Express Server**: Handles HTTP requests and routes
2. **Redis**: Used for caching and as a message broker
3. **BullMQ**: Manages job queues for contest submissions
4. **JWT**: Provides authentication for users

### Development Features

#### Console.log Warning System

The application includes a built-in warning system for detecting `console.log` statements in production code:

- When `NODE_ENV` is not set to 'development', any `console.log` calls will display a warning message with the file and line number
- This helps prevent debug logs from being left in production code
- Example warning: `⚠️ WARNING: console.log detected in production code at app.ts:123 - Remove before building!`

To enable development mode (no warnings):
```bash
NODE_ENV=development npm run dev
```

### Data Flow

1. Contests are created and stored in Redis
2. Users register and receive a JWT token
3. Submissions are added to a queue using BullMQ
4. Workers process submissions asynchronously

## HTTP vs HTTPS

The application supports both HTTP and HTTPS:

- For development, HTTP is usually sufficient (set `HTTPS=false` in `.env`)
- For production, HTTPS is recommended for security (set `HTTPS=true` in `.env` and provide valid SSL certificates)

The server will automatically fall back to HTTP if:
- `HTTPS=false` in the `.env` file
- SSL certificates cannot be loaded

## Redis Configuration

This application uses Redis for:
- Caching contest data
- Managing job queues with BullMQ

Ensure Redis is running before starting the application. The default configuration connects to Redis at `localhost:6379`.

Important Redis configuration notes:
- The application uses database 0 by default
- For BullMQ to work properly, `maxRetriesPerRequest` is set to `null`

## Troubleshooting

### Redis Connection Issues

If you encounter Redis connection issues:

1. Ensure Redis server is running:
   ```bash
   redis-cli ping
   ```
   Should return `PONG`

2. Check Redis connection settings in `.env`

3. If Redis data is unexpectedly cleared, check:
   - Redis persistence configuration
   - Memory limits and eviction policies
   - Unintended `FLUSHDB` or `FLUSHALL` commands

### SSL Certificate Issues

If you encounter SSL certificate issues:

1. Ensure certificates exist at the paths specified in `.env`
2. For development, you can set `HTTPS=false` to use HTTP instead
3. For production, ensure you have valid SSL certificates

## License

ISC
