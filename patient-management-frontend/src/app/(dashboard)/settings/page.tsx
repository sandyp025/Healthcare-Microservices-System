'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { Settings, User, Shield, Bell, Database } from 'lucide-react'

export default function SettingsPage() {
  const { user, logout } = useAuth()

  const systemInfo = [
    { label: 'API Base URL', value: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4004' },
    { label: 'Auth Service URL', value: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:4005' },
    { label: 'Patient Service URL', value: process.env.NEXT_PUBLIC_PATIENT_SERVICE_URL || 'http://localhost:4000' },
    { label: 'Analytics Service URL', value: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || 'http://localhost:4002' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account and system preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle>Account Information</CardTitle>
            </div>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={user?.role || ''}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={user?.id || ''}
                disabled
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Security settings and authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Session Active</p>
                <p className="text-sm text-green-600">You are securely logged in</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-orange-600" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive patient updates via email</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Alerts</p>
                  <p className="text-sm text-gray-600">Get notified about system events</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-600" />
              <CardTitle>System Information</CardTitle>
            </div>
            <CardDescription>
              Backend service configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemInfo.map((info) => (
              <div key={info.label} className="space-y-1">
                <Label className="text-sm font-medium">{info.label}</Label>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded font-mono">
                  {info.value}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <CardTitle>Application Information</CardTitle>
          </div>
          <CardDescription>
            Healthcare Management System details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Frontend Technology</h3>
              <p className="text-blue-600 mt-1">Next.js 15 with TypeScript</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">UI Framework</h3>
              <p className="text-green-600 mt-1">Tailwind CSS + Radix UI</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">Backend Services</h3>
              <p className="text-purple-600 mt-1">Spring Boot Microservices</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Patient Management with CRUD operations</li>
              <li>• JWT-based Authentication & Authorization</li>
              <li>• Real-time Analytics and Reporting</li>
              <li>• Responsive Design for all devices</li>
              <li>• Production-ready architecture</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}