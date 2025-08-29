export interface Patient {
  id: string
  name: string
  email: string
  address: string
  dateOfBirth: string
  registeredDate: string
}

export interface PatientRequest {
  name: string
  email: string
  address: string
  dateOfBirth: string
}

export type PatientResponse = Patient

export interface PatientFormData {
  name: string
  email: string
  address: string
  dateOfBirth: string
}