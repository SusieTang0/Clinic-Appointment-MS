import React, { useState } from "react";
import UpdateDoctorModal from "./UpdateDoctorModal";



export const AppointmentRowItem: React.FC<{
  id: number;
  patientName: string;
  patientId: number;
  doctorName: string;
  doctorId: number;
  date: string;
  time: string;
  description: string;
  status: boolean;
  rowCancel: Function;
  // deleteAppointment: Function
}> = (props) => {
  const [showModal, setShowModal] = useState(false);


  const currentDate = new Date();
  const oldDate = new Date(props.date);
  const differenceInDays = Math.floor((oldDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  
  const isButtonDisabled = (differenceInDays <= 1 );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  
  return (
    
    <tr>
      <th scope='row'>{props.id}</th>
      <td>{props.patientName}</td>
      <td>{props.doctorName}</td>
      <td>{props.date}</td>
      <td>{props.time}</td>
      <td>{props.description}</td>
      <td>{props.status ? 'Completed' : 'Uncompleted'}</td>
      <td>
        <button className='btn btn-primary' onClick={handleShowModal} disabled={isButtonDisabled}>Update</button>
        <UpdateDoctorModal show={showModal} handleClose={handleCloseModal} id={props.id}
        patientId={props.patientId}
        doctorId={props.doctorId}
        patientName={props.patientName} // Corrected prop name
        doctorName={props.doctorName} date={props.date} time={props.time} description={props.description} status={props.status}/>

       
      </td>
    </tr>
  );
};
