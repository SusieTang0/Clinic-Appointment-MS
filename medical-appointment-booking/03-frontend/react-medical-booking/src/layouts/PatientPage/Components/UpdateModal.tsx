import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateAppointment } from '../../../Models/appointmentApi';
import { Appointment } from '../../../Models/Appointment';

interface ModalProps {
  id: number;
  patientName: string;
  patientId: number;
  doctorName: string;
  doctorId: number;
  date: string;
  time: string;
  description: string;
  status: boolean;
  show: boolean;
  handleClose: () => void;
}

interface UpdateAppointmentFormProps {
  
  // deleteAppointment: Function
}
const UpdateModal: React.FC<ModalProps> = (props) => {
  const [oldFormData, setOldFormData] = useState<Appointment>({
    id: props.id,
    patientName: props.patientName,
    patientId: props.patientId,
    doctorName: props.doctorName,
    doctorId: props.doctorId,
    date: props.date,
    time: props.time,
    description: props.description,
    status: props.status,
  });
  const [formData, setFormData] = useState<Appointment>({
    id: props.id,
    patientName: props.patientName,
    patientId: props.patientId,
    doctorName: props.doctorName,
    doctorId: props.doctorId,
    date: props.date,
    time: props.time,
    description: props.description,
    status: props.status,
  });

  const { id, patientName,patientId, doctorName,doctorId, date, time, description,status } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(formData == null){
        return;
      }
      if(formData!==oldFormData){
        const response = await updateAppointment(props.id, formData); 
      }
      
      props.handleClose(); 
      
      window.location.reload();
      alert('Appointment updated successfully');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  const getMinDate = () => {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 3); // Add one day
    
    // Format nextDate to 'YYYY-MM-DD'
    const formattedDate = nextDate.toISOString().split('T')[0];
    
    return formattedDate;
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
       <form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Update Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              min={getMinDate()}
              value={date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time   ( 09:00 ~ 17:00 )</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              min={'09:00'}
              max={'17:00'}
              step={1800}
              value={time}
              onChange={handleChange}
              required
            />
        
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" className="d-flex justify-content-end" type="submit">Save Changes</Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
