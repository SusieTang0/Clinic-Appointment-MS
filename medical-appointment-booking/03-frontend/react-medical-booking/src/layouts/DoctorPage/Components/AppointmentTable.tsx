import React, { useEffect, useState } from "react";
import { Appointment } from "../../../Models/Appointment";

import { deleteAppointment, getAppointmentsByDoctorId, updateAppointment } from "../../../Models/appointmentApi";
import { Alert } from "react-bootstrap";
import { AppointmentRowItem } from "./AppointmentRowItem";


interface AppointmentTableProps {
  doctorId: number;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({doctorId}) =>{
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointDatas = await getAppointmentsByDoctorId(doctorId);
        console.log(appointDatas);

        const appointmentsArray: Appointment[] = Array.isArray(appointDatas) ? appointDatas : [appointDatas];
        const transformedAppointments = appointmentsArray.map((appointment: Appointment) => ({
          ...appointment,
          id: appointment.id ?? 0,
          patientName: appointment.patientName ?? '',
          doctorName: appointment.doctorName ?? '',
          date: appointment.date ?? '',
          time: appointment.time ?? '',
          description: appointment.description ?? '',
          status: appointment.status ?? false,
        }));

        setAppointments(transformedAppointments);
        console.log(transformedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleCancel = async (appointmentId: number) => {
    try {
      await deleteAppointment(appointmentId);
      window.location.reload();
      setMessage('Failed to cancel appointment');
      alert('Appointment canceled successfully');
    } catch (error) {
      setMessage('Failed to cancel appointment');
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };


  return (
    <div className="container my-5 pb-5">
        <h3>Appointment List</h3>
        <hr />
        <div>
          {message && (
            <Alert variant="success" onClose={() => setMessage(null)} dismissible>
              {message}
            </Alert>
          )}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment,index) => (
                <AppointmentRowItem
                  key={appointment.id ?? index}
                  id={appointment.id ?? 0}
                  patientName={appointment.patientName ?? ''}
                  patientId={appointment.patientId ?? 0}
                  doctorName={appointment.doctorName ?? ''}
                  doctorId={appointment.doctorId ?? 0}
                  date={appointment.date ?? ''}
                  time={appointment.time ?? ''}
                  description={appointment.description ?? ''}
                  status={appointment.status ?? false}
                  rowCancel={handleCancel}
                />
              ))}
            </tbody>
          </table>
        </div>
    </div>

  );
};

export default AppointmentTable;
