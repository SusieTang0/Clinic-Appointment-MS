
import axios from 'axios';
import { Doctor } from './Doctor';


const API_BASE_URL = 'http://localhost:8080/api/doctors'; // Adjust the base URL as needed

export const getAllDoctors = async (): Promise<Doctor[]> => {
  const response = await axios.get<Doctor[]>(API_BASE_URL);
  return response.data;
};

  export const getDoctorById = async (id: number): Promise<Doctor> => {
    const response = await axios.get<Doctor>(`${API_BASE_URL}/${id}`);
    return response.data;
  };

  export const getDoctorByEmail = async (email: string): Promise<Doctor> => {
    const response = await axios.get<Doctor>(`${API_BASE_URL}/email/${email}`);
    return response.data;
  };


