# 📘 API Documentation

## Base URL
All endpoints are prefixed with `/api/v1`

## 🔐 Authentication

### Admin Login
Authenticate an admin user.

**Endpoint:** `POST /admin/login`

<details>
  <summary>📤 Request Body</summary>

```json
{
    "email": "admin@example.com",
    "password": "password123"
}
```
</details>

<details>
  <summary>✅ Success Response (200)</summary>

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
</details>

## User Management
@Depricated use TS server one
### User Registration
Register a new user.

**Endpoint:** `POST /user/register`

<details>
  <summary>📤 Request Body</summary>

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
</details>

<details>
  <summary>✅ Success Response (201)</summary>

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
</details>

<details>
  <summary>⚠️ Error Responses</summary>

- **Email Already Exists (409):**
```json
{
    "error": "Email already exists"
}
```

- **Invalid Request (400):**
```json
{
    "error": "Invalid request body"
}
```
</details>

## 🏆 Contest Management

### Create Contest
Create a new contest.

**Endpoint:** `POST /contests`

<details>
  <summary>📤 Request Body</summary>

```json
{
    "question_id": "question_id_here",
    "result": "contest_result",
    "date": "2024-03-20"
}
```
</details>

<details>
  <summary>✅ Success Response (201)</summary>

```json
{
    "message": "Contest created successfully",
    "contest_id": "contest_id_here",
    "date": "2024-03-20"
}
```
</details>

### Get Contest
Get contest details.

**Endpoint:** `GET /contests/:id`

<details>
  <summary>✅ Success Response (200)</summary>

```json
{
    "id": "contest_id_here",
    "question_id": "question_id_here",
    "result": "contest_result",
    "date": "2024-03-20",
    "created_at": "2024-03-20T10:00:00Z"
}
```
</details>

<details>
  <summary>⚠️ Error Responses</summary>

- **Contest Not Found (404):**
```json
{
    "error": "Contest not found"
}
```

- **Invalid Contest ID (400):**
```json
{
    "error": "Invalid contest ID"
}
```
</details>

## 🔗 Test Link Management

### Generate Test Link
Generate a new test link for a contest.

**Endpoint:** `POST /testlink/:id`

<details>
  <summary>📤 Request Body</summary>

```json
{
    "name": "Test Name",
    "location": "Test Location"
}
```
</details>

<details>
  <summary>✅ Success Response (200)</summary>

```json
{
    "message": "Test link generated successfully",
    "link": "https://your-domain.com?encoded_token",
    "contest_id": "contest_id_here"
}
```
</details>

## 📝 Notes

- All requests and responses are in JSON format
- Timestamps are in ISO 8601 format (UTC)
- MongoDB is used as the primary database
- Redis is used for caching contest and question data
- Test links are base64 encoded for security
- The system uses environment variables for configuration:
  - MONGO_URI: MongoDB connection string
  - MONGO_DB: MongoDB database name
  - REDIS_URI: Redis connection string 
