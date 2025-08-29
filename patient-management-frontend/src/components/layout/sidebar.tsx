'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Users, 
  BarChart3, 
  Home, 
  Settings, 
  LogOut, 
  Heart 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Patients',
    href: '/patients',
    icon: Users,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 shrink-0 items-center px-6">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold text-white">HealthCare</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="flex-shrink-0 border-t border-gray-700 p-4">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{user?.email}</p>
            <p className="text-xs text-gray-300">{user?.role}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-300 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}