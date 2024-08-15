// src/components/AppointmentList.tsx
import React, { useEffect, useState } from 'react';
import { getPatientByEmail } from '../../Models/patientApi';
import { getAppointmentsByPatientId } from '../../Models/appointmentApi';
import { Appointment } from '../../Models/Appointment';
import PatientNavbar from '../NavbarAndFooter/PatientNavbar';
import AppointmentTable from './Components/AppointmentTable';
import { Footer } from '../NavbarAndFooter/Footer';


const PatientDashboard: React.FC = () => {
  const [patientId, setPatientId] = useState<number>(0); // Initialize with null
  const [patientName, setPatientName] = useState<string>(''); 
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = window.localStorage.getItem('username');
        if (!user) return;
        const data = await getPatientByEmail(user);
        if (data && data.id !== undefined && data.firstname !== undefined && data.lastname !== undefined) {
          setPatientId(data.id); // Set patientId only if data.id is defined
          setPatientName(`${data.firstname} ${data.lastname}`)
          window.localStorage.setItem('patientId', data.id.toString()); // Store patientId in localStorage
        }

        if (!patientId) return;
        const appointDatas = await getAppointmentsByPatientId(patientId);

        // Ensure appointDatas is an array
        const appointmentsArray: Appointment[] = Array.isArray(appointDatas) ? appointDatas : [appointDatas];

        const transformedAppointments = appointmentsArray.map((appointment: Appointment) => ({
          ...appointment,
          id: appointment.id ?? 0,
          patientName: appointment.patientName ?? '',
          doctorName: appointment.doctorName ?? '',
          date: appointment.date ?? '',
          time: appointment.time ?? '',
          description: appointment.description ?? '',
          status: appointment.status ?? false
        }));

        setAppointments(transformedAppointments);
        console.log(transformedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId]); // Add patientId to dependency array to fetch appointments when patientId changes

  return (
    <>
      <PatientNavbar />
      <div className="my-5 container " >
        <AppointmentTable appointments={appointments} patientId={patientId}  patientName={patientName}/>
      </div>
      <Footer />
    </>
  );
};

export default PatientDashboard;
