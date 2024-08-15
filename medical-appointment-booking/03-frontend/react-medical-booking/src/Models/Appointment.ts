export interface Appointment {
  id?: number;
  patientName: string;
  patientId: number;
  doctorName: string;
  doctorId: number;
  date: string; // ISO date string
  time: string; // Time in HH:mm format
  description: string;
  status: boolean;
}