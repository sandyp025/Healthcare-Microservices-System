'use client'

import { useState } from 'react'
import { Patient } from '@/types/patient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, Search, UserPlus } from 'lucide-react'
import { formatDate, calculateAge } from '@/lib/utils'

interface PatientTableProps {
  patients: Patient[]
  onEdit: (patient: Patient) => void
  onDelete: (patientId: string) => void
  onAdd: () => void
  isLoading?: boolean
}

export default function PatientTable({
  patients,
  onEdit,
  onDelete,
  onAdd,
  isLoading = false
}: PatientTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof Patient>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const handleSort = (field: keyof Patient) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Patient Management</CardTitle>
            <CardDescription>
              Manage and view all patients in the system
            </CardDescription>
          </div>
          <Button onClick={onAdd} className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Add Patient</span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            {sortedPatients.length} patient{sortedPatients.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedPatients.length === 0 ? (
          <div className="text-center py-8">
            <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No patients</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'No patients match your search.' : 'Get started by creating a new patient.'}
            </p>
            {!searchTerm && (
              <Button onClick={onAdd} className="mt-4">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('name')}
                  >
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('email')}
                  >
                    Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-xs">
                            {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <span>{patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{calculateAge(patient.dateOfBirth)} years</TableCell>
                    <TableCell className="max-w-xs truncate" title={patient.address}>
                      {patient.address}
                    </TableCell>
                    <TableCell>{formatDate(patient.registeredDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(patient)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(patient.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}