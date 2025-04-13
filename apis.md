# API Documentation

## Base URL
All endpoints are prefixed with `/api/v1`

## Authentication

### Admin Login
Authenticate an admin user.

**Endpoint:** `POST /admin/login`

**Request Body:**
```json
{
    "email": "admin@example.com",
    "password": "password123"
}
```

**Response (Success - 200 OK):**
```json
{
    "message": "Login successful",
    "admin": {
        "id": "admin_id_here",
        "name": "Admin Name",
        "email": "admin@example.com"
    }
}
```

## User Management

### User Registration
Register a new user.

**Endpoint:** `POST /user/register`

**Request Body:**
```json
{
    "name": "User Name",
    "email": "user@example.com",
    "phone_number": "1234567890",
    "dob": "2000-01-01",
    "address": "User Address",
    "school": "User School"
}
```

**Response (Success - 201 Created):**
```json
{
    "message": "User created successfully",
    "user": {
        "id": "user_id_here",
        "name": "User Name",
        "email": "user@example.com",
        "phone_number": "1234567890",
        "dob": "2000-01-01",
        "address": "User Address",
        "school": "User School",
        "created_at": "2024-03-20T10:00:00Z"
    }
}
```

## Contest Management

### Create Contest
Create a new contest.

**Endpoint:** `POST /contests`

**Request Body:**
```json
{
    "question_id": "question_id_here",
    "result": "contest_result",
    "date": "2024-03-20"
}
```

**Response (Success - 201 Created):**
```json
{
    "message": "Contest created successfully",
    "contest_id": "contest_id_here",
    "date": "2024-03-20"
}
```

### Get Contest
Get contest details.

**Endpoint:** `GET /contests/:id`

**Response (Success - 200 OK):**
```json
{
    "id": "contest_id_here",
    "question_id": "question_id_here",
    "result": "contest_result",
    "date": "2024-03-20",
    "created_at": "2024-03-20T10:00:00Z"
}
```

## Test Link Management

### Generate Test Link
Generate a new test link for a contest.

**Endpoint:** `POST /testlink/:id`

**Request Body:**
```json
{
    "name": "Test Name",
    "location": "Test Location"
}
```

**Response (Success - 200 OK):**
```json
{
    "message": "Test link generated successfully",
    "link": "https://your-domain.com?encoded_token",
    "contest_id": "contest_id_here"
}
```

## Error Codes
- 400: Bad Request - Invalid request body or parameters
- 401: Unauthorized - Invalid credentials
- 404: Not Found - Resource not found
- 409: Conflict - Resource already exists (e.g., email already registered)
- 500: Internal Server Error - Server-side error

## Notes
- All requests and responses are in JSON format
- Timestamps are in ISO 8601 format (UTC)
- MongoDB is used as the primary database
- Redis is used for caching contest and question data
- Test links are base64 encoded for security
- The system uses environment variables for configuration:
  - MONGO_URI: MongoDB connection string
  - MONGO_DB: MongoDB database name
  - REDIS_URI: Redis connection string 