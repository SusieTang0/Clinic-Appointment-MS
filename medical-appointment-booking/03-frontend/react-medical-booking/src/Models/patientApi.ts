// src/api.ts
import axios from 'axios';
import { Patient } from './Patient';

const API_BASE_URL = 'http://localhost:8080/api/patients'; // Adjust the base URL as needed


export const getAllPatients = async (): Promise<Patient[]> => {
  const response = await axios.get<Patient[]>(API_BASE_URL);
  return response.data;
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await axios.get<Patient>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getPatientByEmail = async (email: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${API_BASE_URL}/email/${email}`);
  return response.data;
};

export const createPatient = async (patient: Patient): Promise<Patient> => {
  const response = await axios.post<Patient>(`${API_BASE_URL}/register`, patient);
  return response.data;
};

export const updatePatient = async (id: number, patient: Patient): Promise<Patient> => {
  const response = await axios.put<Patient>(`${API_BASE_URL}/${id}`, patient);
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
