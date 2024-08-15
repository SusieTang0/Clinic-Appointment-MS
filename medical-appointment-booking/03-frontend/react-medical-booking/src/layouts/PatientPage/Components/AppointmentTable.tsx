import React, { useState } from "react";
import { Appointment } from "../../../Models/Appointment";
import { AppointmentRowItem } from "./AppointmentRowItem";
import { deleteAppointment, updateAppointment } from "../../../Models/appointmentApi";
import { Alert } from "react-bootstrap";
import AddModal from "./AddModal";
import { Patient } from "../../../Models/Patient";

interface AppointmentTableProps {
  patientId:number;
  patientName:string;
  appointments: Appointment[];
}

const AppointmentTable: React.FC<{  patientId:number,
  patientName:string,appointments:Appointment[]}> = (props) =>{
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);


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
    <div>
      <div className="d-flex justify-content-between align-item-center">
        <h1 className="m-0 py-3">Appointment List</h1>
        <div className='m-0 py-3 d-flex justify-content-center align-item-center"'>
          <button className='btn btn-primary m-0 py-2 ' onClick={handleShowModal} >Create New Appointment</button>
          <AddModal show={showModal} handleClose={handleCloseModal}  patientId={props.patientId}  patientName={props.patientName}/>
        </div>
       
      </div>
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
            {props.appointments.map((appointment,index) => (
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
