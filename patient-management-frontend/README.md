# Healthcare Management System - Frontend

A modern, production-ready frontend for the Healthcare Management System built with Next.js, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC)
![React Query](https://img.shields.io/badge/React%20Query-5-FF4154)

## Features

### 🏥 **Patient Management**
- Complete CRUD operations for patient records
- Advanced search and filtering capabilities
- Patient demographics and analytics
- Real-time data updates

### 🔐 **Authentication & Security**
- JWT-based authentication system
- Role-based access control (ADMIN/USER)
- Secure session management
- Protected routes and API calls

### 📊 **Analytics Dashboard**
- Real-time patient statistics
- Monthly registration trends
- Age group distribution charts
- Growth rate analysis

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Dark/Light mode support
- Accessible components with ARIA support
- Professional healthcare-focused design

### ⚡ **Performance Optimized**
- Server-side rendering with Next.js
- Optimistic updates for better UX
- Lazy loading and code splitting
- Production-ready optimization

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend services running (see main README)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   
   Create `.env.local` file with your backend service URLs:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4004
   NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:4005
   NEXT_PUBLIC_PATIENT_SERVICE_URL=http://localhost:4000
   NEXT_PUBLIC_ANALYTICS_SERVICE_URL=http://localhost:4002
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Login Credentials (Demo)
```
Email: testuser@test.com
Password: password
```

### Available Routes

- `/` - Redirects to dashboard or login
- `/login` - Authentication page
- `/dashboard` - Main dashboard with analytics
- `/patients` - Patient management interface
- `/analytics` - Detailed analytics and reports
- `/settings` - User settings and system info

## API Integration

The frontend integrates with the following backend services:

### Authentication Service (Port 4005)
- `POST /login` - User authentication
- `GET /validate` - Token validation

### Patient Service (via API Gateway - Port 4004)
- `GET /patients` - Retrieve all patients
- `POST /patients` - Create new patient
- `PUT /patients/{id}` - Update patient
- `DELETE /patients/{id}` - Delete patient

### API Gateway (Port 4004)
- Central entry point for all API calls
- Handles JWT validation and routing
- Provides unified API interface

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Production Deployment

### Environment Variables
Set the following in production:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-url
NEXT_PUBLIC_AUTH_SERVICE_URL=https://your-auth-service-url
NEXT_PUBLIC_PATIENT_SERVICE_URL=https://your-patient-service-url
NEXT_PUBLIC_ANALYTICS_SERVICE_URL=https://your-analytics-service-url
```

### Deployment Options
- **Vercel**: Optimized for Next.js deployment
- **Netlify**: Static site deployment
- **Docker**: Container-based deployment
- **AWS**: EC2, ECS, or Lambda deployment

---

*Built with ❤️ for modern healthcare management*
