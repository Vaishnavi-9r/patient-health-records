# Patient Health Record - REST API Specification

## Base URL
`http://localhost:5000`

## Authentication
- JWT in `Authorization: Bearer <token>` header
- Login returns `{ success, message, token, user }`
- POST /login kept for backward compatibility (same as /api/auth/login)

---

## Endpoints

### Health
| Method | URL | Purpose |
|--------|-----|---------|
| GET | / | Health check |

### Auth
| Method | URL | Purpose | Auth |
|--------|-----|---------|------|
| POST | /login | Login (patient or staff) - backward compatible | No |
| POST | /api/auth/login | Login (patient or staff) | No |

### Dashboard
| Method | URL | Purpose | Auth | Role |
|--------|-----|---------|------|------|
| GET | /api/dashboard/stats | Get counts (records, appointments, patients) | Yes | patient, staff |

### Records
| Method | URL | Purpose | Auth | Role |
|--------|-----|---------|------|------|
| GET | /api/records | List records (patient: own, staff: all) | Yes | patient, staff |
| POST | /api/records | Create record | Yes | patient, staff |
| DELETE | /api/records/:id | Delete record | Yes | staff |

### Appointments
| Method | URL | Purpose | Auth | Role |
|--------|-----|---------|------|------|
| GET | /api/appointments | List appointments | Yes | patient, staff |
| POST | /api/appointments | Create appointment | Yes | staff only |
| DELETE | /api/appointments/:id | Delete appointment | Yes | patient, staff |

---

## Frontend Page ↔ Backend Mapping

| Page | Route | API Calls |
|------|-------|-----------|
| Login | / | None |
| PatientLogin | /login/patient | POST /login (returns JWT) |
| StaffLogin | /login/staff | POST /login (returns JWT) |
| Dashboard | /dashboard | GET /api/dashboard/stats |
| UploadRecord | /upload | POST /api/records |
| Appointments | /appointments | GET /api/appointments, DELETE /api/appointments/:id |
| ScheduleAppointment | /appointments/new | POST /api/appointments |
| HospitalRecords | /hospital-records | GET /api/records |

---

## Running the App

### Backend
```powershell
cd backend
npm start
```
Server runs at http://localhost:5000

### Frontend
```powershell
cd frontend
npm start
```
App runs at http://localhost:3000

### Both (concurrently)
From project root:
```powershell
cd backend; npm start
```
In another terminal:
```powershell
cd frontend; npm start
```
