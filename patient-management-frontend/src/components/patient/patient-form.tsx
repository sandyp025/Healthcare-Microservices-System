'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PatientFormData, Patient } from '@/types/patient'
import { formatDateForInput } from '@/lib/utils'

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
})

interface PatientFormProps {
  patient?: Patient
  onSubmit: (data: PatientFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function PatientForm({ 
  patient, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient ? {
      name: patient.name,
      email: patient.email,
      address: patient.address,
      dateOfBirth: formatDateForInput(patient.dateOfBirth),
    } : undefined,
  })

  const handleFormSubmit = async (data: PatientFormData) => {
    await onSubmit(data)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {patient ? 'Edit Patient' : 'Add New Patient'}
        </CardTitle>
        <CardDescription>
          {patient 
            ? 'Update patient information below'
            : 'Fill in the patient details to add them to the system'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter patient's full name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter full address"
              {...register('address')}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : patient ? 'Update Patient' : 'Add Patient'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}