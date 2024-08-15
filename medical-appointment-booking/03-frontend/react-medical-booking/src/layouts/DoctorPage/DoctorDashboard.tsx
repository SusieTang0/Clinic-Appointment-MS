import React, { useState, useEffect } from 'react';
import { Doctor } from '../../Models/Doctor';
import { getDoctorByEmail } from '../../Models/doctoerApi';
import AppointmentTable from './Components/AppointmentTable';
import DoctorNavbar from '../NavbarAndFooter/DoctorNavbar';
import { Footer } from '../NavbarAndFooter/Footer';

const DoctorDashboard: React.FC = () => {
  const [doctorId, setDoctoId] = useState<number>(); 
  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const user = window.localStorage.getItem('username');
        if (!user) return;
  
        const data = await getDoctorByEmail(user);
        if (!data) return;
  
        setDoctor(data);
        if (!data.id) {
          return;
        }
  
        setDoctoId(data.id);
      
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    fetchDoctors();
  }, []);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <DoctorNavbar/>
   
   <div className='container mb-5'>
   <div id="loginbox" style={{ margin: '10px  0 auto ' }} className="col-md-12 col-sm-12 col-sm-offset-8">
    <div className="card border-secondary w-80 py-2" style={{ margin: '30px 0 auto ' }}>
      <div className='container pt-3 pb-2 my-1 w-100 color-dark d-flex justify-content-between align-item-center' >
       <span className='h6 m-1'>Doctor Name: <em className='mx-3'>{doctor.firstname}  {doctor.lastname}</em></span>
        <span className='h6 m-1'>Doctor ID: <em className='mx-3'>{doctor.id}</em></span>
        <span className='h6 m-1'> Speciality: <em className='mx-3'>{doctor.specialty}</em></span>
      </div>
    </div>
    
    <AppointmentTable doctorId={doctorId ?? 0} />
    </div>
   </div>
    
    <Footer/>
    </>
  );
};

export default DoctorDashboard;
