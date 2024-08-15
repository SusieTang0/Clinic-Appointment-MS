import axios from 'axios';
import { Appointment } from './Appointment';


const API_BASE_URL = 'http://localhost:8080/api/appointments';

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const response = await axios.get<Appointment[]>(API_BASE_URL);
  return response.data;
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
  const response = await axios.get<Appointment>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getAppointmentsByPatientId = async (patient_id: number): Promise<Appointment> => {
  const response = await axios.get<Appointment>(`${API_BASE_URL}/patient/${(patient_id)}`);
  return response.data;
};

export const getAppointmentsByDoctorId = async (doctor_id: number): Promise<Appointment> => {
  const response = await axios.get<Appointment>(`${API_BASE_URL}/doctor/${doctor_id}`);
  return response.data;
};

export const createAppointment = async (appointment: Appointment): Promise<Appointment> => {
  const response = await axios.post<Appointment>(`${API_BASE_URL}/booking`, appointment);
  return response.data;
};

export const updateAppointment = async (id: number, appointment: Appointment): Promise<Appointment> => {
  const response = await axios.put<Appointment>(`${API_BASE_URL}/${id}`, appointment);
  return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
