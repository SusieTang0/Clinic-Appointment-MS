import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Patient } from '../../../Models/Patient';
import { getPatientByEmail, getPatientById, updatePatient } from '../../../Models/patientApi';

interface ProfileModalProps {
  show: boolean;
  handleClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = (props) => {
  const[patient,setPatient] = useState<Patient>();
  const[username,setUsername] = useState<string | null>(null);

  const [formData, setFormData] = useState<Patient>({
    id: 0,
    firstname: '',
    lastname: '',
    email:  '',
    phone: '',
    password: '', // You may choose to handle password securely based on your application's needs
  });

  useEffect(() => {
    const fetchPatient = async () => {
      const userdata = window.localStorage.getItem('username');
      if (userdata !== undefined) {
        setUsername(userdata);
        const patientData = await getPatientByEmail(userdata!);
        setPatient(patientData);
        setFormData({
          id: patientData.id,
          firstname: patientData.firstname,
          lastname: patientData.lastname,
          email: patientData.email,
          phone: patientData.phone,
          password: patientData.password
        });
      }
    };
   fetchPatient();
  },[])

  const { firstname, lastname, email, phone, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const patientId = window.localStorage.getItem('patientId');
      if (patientId === null || patientId === undefined) {
        console.error('Patient ID not found in localStorage');
        return;
      }

      const response = await updatePatient(parseInt(patientId), formData); // Parse patientId to integer
      console.log(response);
      
      props.handleClose(); 
      alert('Successfully edit your profile!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating patient:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label" >Name</label>
            <input type="text" id="firstname" name="firstname" value={firstname+' '+lastname} disabled  className="form-control" />
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" name="email" value={email} disabled className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="tel" id="phone" name="phone" value={phone} onChange={handleChange} className="form-control" />
          </div>
          
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="success" type="submit">
          Save Changes
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ProfileModal;
