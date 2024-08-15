import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { createAppointment, updateAppointment } from '../../../Models/appointmentApi';
import { Appointment } from '../../../Models/Appointment';

interface AddModalProps {
  patientId:number;
  patientName:string;
  show: boolean;
  handleClose: () => void;
}

interface UpdateAppointmentFormProps {
  
  // deleteAppointment: Function
}
const AddModal: React.FC<{patientId:number,
  patientName:string,
  show: boolean,
  handleClose: () => void,}> = (props) => {
  const doctors = ['John Smith', 'Mary Wood', 'Nancy Tack'];
  const [doctorNamedata, setDoctorName] = useState('');
  const [doctorIdData, setDoctorId] = useState<number>(0);
  const [formData, setFormData] = useState<Appointment>({
    id: 0,
    patientName:props.patientName,
    patientId: props.patientId,
    doctorName: '',
    doctorId: 0,
    date: '',
    time: '',
    description: '',
    status: false,
  });

  
  const {doctorName, doctorId, date, time, description } = formData;



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'doctorName') {

      const idData = doctors.indexOf(value) + 1; // Assuming doctorId starts from 1 based on your previous implementation
      setFormData({
        ...formData,
        [name]: value,
        doctorId: idData,
        patientId: props.patientId,
        patientName: props.patientName,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(formData !== null && formData.date !=='' && formData.time !=='' && doctorId !== 0 && doctorName !== ''){
     
        console.log(formData);
        const response = await createAppointment(formData); // Pass props.id and formData
        console.log(response);
      }
      
      // Optionally, reset form state or show success message
      setFormData({
        id: 0,
        patientName: '',
        patientId: 0,
        doctorName: '',
        doctorId: 0,
        date: '',
        time: '',
        description: '',
        status: false,
      });
      props.handleClose(); 
      alert("New appointment created successfully!!");
      window.location.reload();
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
        <Modal.Title>Create New Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="mb-3">
            <label htmlFor="doctorName" className="form-label">Doctor *</label>
            <select 
              id="doctorName"
              name="doctorName"
              className="form-control"
              value={doctorName}
              onChange={handleChange}
              required>
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
              </select>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date *</label>
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
            <label htmlFor="time" className="form-label">Time *  ( 09:00 ~ 17:00 )</label>
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

export default AddModal;
