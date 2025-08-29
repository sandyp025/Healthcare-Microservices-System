'use client'

import { useState, useEffect, useCallback } from 'react'
import { Patient, PatientFormData } from '@/types/patient'
import { patientService } from '@/services/patient'
import PatientTable from '@/components/patient/patient-table'
import PatientForm from '@/components/patient/patient-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/useToast'

type ViewMode = 'list' | 'add' | 'edit'

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const { toast } = useToast()

  const fetchPatients = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await patientService.getAll()
      setPatients(data)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch patients. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  const handleAddPatient = () => {
    setSelectedPatient(null)
    setViewMode('add')
  }

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setViewMode('edit')
  }

  const handleDeletePatient = async (patientId: string) => {
    if (!confirm('Are you sure you want to delete this patient?')) {
      return
    }

    try {
      await patientService.delete(patientId)
      setPatients(patients.filter(p => p.id !== patientId))
      toast({
        title: 'Success',
        description: 'Patient deleted successfully.',
      })
    } catch (error) {
      console.error('Failed to delete patient:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete patient. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleSubmitForm = async (data: PatientFormData) => {
    try {
      setIsSubmitting(true)
      
      if (viewMode === 'edit' && selectedPatient) {
        const updatedPatient = await patientService.update(selectedPatient.id, data)
        setPatients(patients.map(p => p.id === selectedPatient.id ? updatedPatient : p))
        toast({
          title: 'Success',
          description: 'Patient updated successfully.',
        })
      } else {
        const newPatient = await patientService.create(data)
        setPatients([...patients, newPatient])
        toast({
          title: 'Success',
          description: 'Patient added successfully.',
        })
      }
      
      setViewMode('list')
      setSelectedPatient(null)
    } catch (error) {
      console.error('Failed to submit patient:', error)
      toast({
        title: 'Error',
        description: 'Failed to save patient. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelForm = () => {
    setViewMode('list')
    setSelectedPatient(null)
  }

  if (viewMode === 'add' || viewMode === 'edit') {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleCancelForm}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Patients</span>
          </Button>
        </div>
        
        <PatientForm
          patient={selectedPatient || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
          isLoading={isSubmitting}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-2">
            Manage patient information and records
          </p>
        </div>
      </div>

      <PatientTable
        patients={patients}
        onEdit={handleEditPatient}
        onDelete={handleDeletePatient}
        onAdd={handleAddPatient}
        isLoading={isLoading}
      />
    </div>
  )
}