import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../../Models/Patient';
import { createPatient } from '../../../Models/patientApi';

export const SignUpForm: React.FC = () => {
  const [patient, setPatient] = useState<Patient>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (patient.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);

    try {
      const newPatient = await createPatient(patient);
      alert('Patient created successfully');
      console.log('Created patient:', newPatient);
      navigate('/');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container my-0">
      <div id="loginbox" style={{ margin: '10px auto' }} className="col-md-12 col-sm-12 col-sm-offset-8">
        <div className="card border-secondary">
          <div className="card-header bg-dark text-light"  >
            Sign Up
          </div>
          <div className="card-body">
            <div className="card-text">
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <Form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '25px' }} className="input-group">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Please enter your firstname"
                    className="form-control"
                    value={patient.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: '25px' }} className="input-group">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Please enter your lastname"
                    className="form-control"
                    value={patient.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: '25px' }} className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Please enter your email"
                    className="form-control"
                    value={patient.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: '25px' }} className="input-group">
                  <input
                    type="phone"
                    name="phone"
                    placeholder="Please enter your phone number format:111-222-3333"
                    className="form-control"
                    value={patient.phone}
                    onChange={handleChange}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                </div>
                <div style={{ marginBottom: '25px' }} className="input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Create your password"
                    className="form-control"
                    value={patient.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: '25px' }} className="input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='d-flex justify-content-between align-item-center ' style={{ marginTop: '10px' }} >
                  
                    <Button type="submit" className="btn btn-success w-60 my-2 px-5" style={{ margin: '10px  0 auto' }} >Sign Up</Button>
                    <a type="button" className="btn btn-secondary w-60 my-2"  href="/">Back to HomePage</a>

                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
