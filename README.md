# About DevPulse

<i>A development task management sytem where will manage multiple task assign, resolve and update. </i>

## How to start?

```cmd
git clone https://github.com/UhaiMong/DevPulse_Backend.git
```

```cmd
npm install
```

```cmd
npm run dev
```

---

### Used Technologies

| Tech       | Version | Description                     |
| ---------- | ------- | ------------------------------- |
| TypeScript | 6.3.2   | Nodejs runtime                  |
| Node.js    | 24.11.2 | Runtime                         |
| bcrypt     | -       | password hashing                |
| jwt        | -       | authentication and authrization |
| express    | -       | App routing                     |
| PostgreSQL | -       | SQL Query                       |
| NeonDB     | -       | SQL database                    |

## All API Endpoint and example of request body and response data.

### 1. User Registration

Register a new user account with contributor or maintainer role

**Endpoint**

`POST /api/auth/signup`

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john.doe@devpulse.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

**Success Response (201 Created)**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@devpulse.com",
    "role": "contributor",
    "created_at": "2026-01-20T09:00:00Z",
    "updated_at": "2026-01-20T09:00:00Z"
  }
}
```

---

### 2. User Login

Authenticate user and receive JWT token

**Endpoint**

`POST /api/auth/login`

**Request Body**

```json
{
  "email": "john.doe@devpulse.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@devpulse.com",
      "role": "contributor",
      "created_at": "2026-01-20T09:00:00Z",
      "updated_at": "2026-01-20T09:00:00Z"
    }
  }
}
```

---

### 3. Create Issue

**Access:** Authenticated users (`contributor`, `maintainer`)

Create a new bug report or feature request

**Endpoint**

`POST /api/issues`

**Headers Request**

```
Authorization: your jwt token
```

**Request Body**

```json
{
  "title": "Database connection timeout under load",
  "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
  "type": "bug",
  "status": "open"
}
```

**Success Response (201 Created)**

```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 45,
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2026-05-23T01:39:32.821Z",
    "updated_at": "2026-05-23T01:39:32.821Z"
  }
}
```

---

### 4. Get All Issues

**Access:** Public

Retrieve all issues with optional sorting and filtering

**Endpoint**

`GET /api/issues?sort=newest`
`GET /api/issues?sort=newest&type=bug&status=open`

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Issue retrieved successfullly",
  "data": [
    {
      "id": 2,
      "title": "Database connection timeout under load",
      "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
      "type": "bug",
      "status": "open",
      "reporter_id": 1,
      "created_at": "2026-05-23T01:39:32.821Z",
      "updated_at": "2026-05-23T01:39:32.821Z",
      "reporter": {
        "id": 1,
        "name": "John Doe",
        "role": "contributor"
      }
    },
    {
      "id": 1,
      "title": "Database connection timeout under load",
      "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
      "type": "bug",
      "status": "open",
      "reporter_id": 1,
      "created_at": "2026-05-22T10:42:33.549Z",
      "updated_at": "2026-05-22T10:42:33.549Z",
      "reporter": {
        "id": 1,
        "name": "John Doe",
        "role": "contributor"
      }
    }
  ]
}
```

---

### 5. Get Single Issue

**Access:** Public

**Endpoint**

`GET /api/issues/:id`

**Success Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": 45,
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
    "type": "bug",
    "status": "open",
    "reporter": {
      "id": 1,
      "name": "John Doe",
      "role": "contributor"
    },
    "created_at": "2026-01-20T10:30:00Z",
    "updated_at": "2026-01-20T14:45:00Z"
  }
}
```

---

### 6. Update Issue

**Access:** role=maintainer[all] or contributor[itself only & status='open']

**Endpoint**

`PATCH /api/issues/:id`

**Headers Request**

```
Authorization: JWT token
```

**Request Body**

```json
{
  "title": "Updated: Database pool exhaustion fix needed",
  "description": "Updated description with reproduction steps...",
  "type": "bug"
}
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "id": 45,
    "title": "Updated: Database pool exhaustion fix needed",
    "description": "Updated description with reproduction steps...",
    "type": "bug",
    "status": "in_progress",
    "reporter_id": 1,
    "created_at": "2026-01-20T10:30:00Z",
    "updated_at": "2026-01-20T14:45:00Z"
  }
}
```

---

### 7. Delete Issue

**Access:** Maintainer only

**Endpoint**

`DELETE /api/issues/:id`

**Headers**

```
Authorization: You token
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
```

---

## You may check

#### Github Repo:

```code
https://github.com/UhaiMong/DevPulse_Backend.git
```

#### Live Deployment on Vercel:

```code
https://devpulse-api.vercel.app
```

---
