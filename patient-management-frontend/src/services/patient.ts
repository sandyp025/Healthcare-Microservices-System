import { PatientRequest, PatientResponse } from '@/types/patient'
import { apiClient } from './api'

export const patientService = {
  getAll: async (): Promise<PatientResponse[]> => {
    const response = await apiClient.get<PatientResponse[]>('/patients')
    return response.data
  },

  create: async (patient: PatientRequest): Promise<PatientResponse> => {
    const response = await apiClient.post<PatientResponse>('/patients', patient)
    return response.data
  },

  update: async (id: string, patient: PatientRequest): Promise<PatientResponse> => {
    const response = await apiClient.put<PatientResponse>(`/patients/${id}`, patient)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/patients/${id}`)
  },
}
