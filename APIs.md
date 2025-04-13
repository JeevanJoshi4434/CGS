
# 📘 Contest Cache APIs Documentation

---

## 🔐 **Login API**

**Endpoint:** `POST /api/v1/contest/login`  
Used to register/login a participant for a contest.

### 📤 Request Body
```json
{
  "id": "1744536846676",           // Contest/Test ID
  "email": "test@mail.com",
  "phone_number": 1234567890,
  "DOB": "1990-01-01",             // Date of Birth (YYYY-MM-DD)
  "address": "123 Main St",
  "school": "XYZ School",
  "name": "John Doe"
}
```

---

<details>
  <summary>📥 Success Response (200)</summary>

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "contest": {
      "_id": 1744536846676,
      "result": [],
      "date": "1744541673998",
      "created_at": "2025-04-13T09:34:06.676Z",
      "updated_at": "2025-04-13T09:34:06.681Z"
    },
    "redirect": "https://localhost:4000/start?token=...",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
✅ You get the contest data, a session token, and a redirection link.
</details>

<details>
  <summary>⚠️ Error Responses</summary>

- **Already Logged In (400):**
```json
{
  "success": false,
  "message": "Login already done",
  "data": {
    "redirect": "https://localhost:4000"
  }
}
```

- **Invalid Email (400):**
```json
{
  "success": false,
  "message": "Invalid email"
}
```

- **Contest Not Live Yet (404):**
```json
{
  "success": false,
  "message": "Contest is not live yet"
}
```

- **Internal Server Error (500):**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

</details>

---

## 📤 **Submit API**

**Endpoint:** `POST /api/v1/contest/submit`  
Used to submit answers for a contest.

### 📥 Headers
```json
{
  "sessiontoken": "eyJhbG..."     // Token from Login API
}
```

### 📤 Request Body
```json
{
  "data": {
    // submission data
  },
  "contestId": "1744536846676"
}
```

---

<details>
  <summary>✅ Success Response (200)</summary>

```json
{
  "success": true,
  "message": "Submission queued successfully",
  "data": {
    "jobId": "2",
    "status": "waiting"
  }
}
```
📝 Your submission has been queued and will be processed.
</details>

<details>
  <summary>⚠️ Error Responses</summary>

- **Session Token Required (400):**
```json
{
  "success": false,
  "message": "Session token is required",
  "data": {
    "redirect": "https://localhost:4000"
  }
}
```

- **Invalid Session Token (401):**
```json
{
  "success": false,
  "message": "Invalid token",
  "data": {
    "redirect": "https://localhost:4000"
  }
}
```

- **Login Required (400):**
```json
{
  "success": false,
  "message": "Login to continue",
  "data": {
    "redirect": "https://localhost:4000"
  }
}
```

- **Internal Server Error (500):**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

</details>

---

## 📄 **Get Contest API**

**Endpoint:** `GET /api/v1/contest`  
Used to fetch contest data with or without details.

### 🔎 Query Params

| Param      | Type    | Required | Description                            |
|------------|---------|----------|----------------------------------------|
| `id`       | string  | Yes      | Contest ID                             |
| `detailed` | boolean | No       | Set to `true` to get full contest info |

---

<details>
  <summary>🟢 Success Response with `detailed=true`</summary>

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "detail": {
      "_id": 1744538913012,
      "result": [],
      "date": "1744541673998",
      "created_at": "2025-04-13T10:08:33.012Z",
      "updated_at": "2025-04-13T10:08:33.012Z"
    },
    "link": "https://localhost:4000?token=..."
  }
}
```
</details>

<details>
  <summary>🟡 Success Response with `detailed=false`</summary>

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "detail": null,
    "link": "https://localhost:4000?token=..."
  }
}
```
</details>

<details>
  <summary>❌ Error Responses</summary>

- **Contest Not Found (404):**
```json
{
  "success": false,
  "message": "Contest not found"
}
```

- **Internal Server Error (500):**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

</details>