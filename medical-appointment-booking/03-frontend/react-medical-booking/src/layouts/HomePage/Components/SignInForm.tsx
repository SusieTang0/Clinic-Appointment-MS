import React, {useState} from 'react';
import { getPatientByEmail } from '../../../Models/patientApi';
import { Dropdown } from 'react-bootstrap';
import { getDoctorByEmail } from '../../../Models/doctoerApi';
import { useNavigate } from 'react-router-dom';

interface SignInFormProps {
    onClose: () => void; // 定义关闭表单的回调函数
}

export const SignInForm: React.FC<SignInFormProps> = ({ onClose }) => {
    const [userType, setUserType] = useState<string | null>(null);

    const handleSelectUserType = (eventKey: string | null) => {
      setUserType(eventKey);
    };

    const [username,setUsername]= useState(''); 
    const [password,setPassword]= useState(''); 
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignInClick = async () => {
      try{
        
        
        if(userType === "Patient Entry"){
          const patient = await getPatientByEmail(username);
          if(patient === undefined){
            setError('Can not find this user.');
            return;
          }
          if(patient.password !== password){
            setError('Passwords do not match.');
            return;
          }
        }else{
          const doctor = await getDoctorByEmail(username);
          if(doctor === undefined){
            setError('Can not find this user.');
            return;
          }
          if(doctor.password !== password){
            setError('Passwords do not match.');
            return;
          }
        }
            
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('userType',userType ?? '');
        setError(null);
        
        alert("Log in successfully!");
        if(userType === "Patient Entry"){
          navigate('/PatientPage');
        }else{
          navigate('/DoctorPage');
        }
        


      }catch(error){
        setError('Can not find this user. Please try again.');
        console.error(error);
      }
      
    }
    
    return (
      <>
        <div className="container my-0">  
          <div id="loginbox" style={{ margin: '10px  0 auto ' }} className="col-md-12 col-sm-12 col-sm-offset-8">
            <div className="card border-secondary w-50" style={{ margin: '10px auto ' }}>
              <ul className='container py-3 my-1 w-100 color-dark d-flex justify-content-center align-item-center' style={{listStyle: 'none' }}>
                <li  className=' nav-item m-0 p-2 '><label>Please select user type: </label></li>
                <li className='nav-item m-0 '>
                    <Dropdown onSelect={handleSelectUserType}>
                    <Dropdown.Toggle variant="success " id="dropdown-basic">
                        {userType ? userType : 'Select User Type'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Patient Entry">If your are a Patient</Dropdown.Item>
                        <Dropdown.Item eventKey="Doctor Entry">If your are a Doctor</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </li>
              </ul>
            </div>
              {userType && (
              <div className="card border-secondary w-50 "style={{ margin: '10px auto ' }}>
                <div className="card-header bg-dark d-flex align-item-center py-3" style={{ color: 'lightgrey' }}>
                Sign In
                </div>

               
                <div className="card-body mt-3">
                  <div className="card-text">
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                      {/* Login Form */}
                      <form className="form-horizontal">
                        {/* Place for messages: error, alert etc ... */}
                        <div className="form-group">
                            <div className="col-xs-15">
                                <div>
                                    {/* Check for login error */}
                                    <div>
                                        {/* This part needs to be handled dynamically in React */}
                                        {false && (
                                            <div className="alert alert-danger col-xs-offset-1 col-xs-10">
                                                Invalid username and password.
                                            </div>
                                        )}
                                    </div>

                                    {/* Check for logout */}
                                    <div>
                                        {/* This part needs to be handled dynamically in React */}
                                        {false && (
                                            <div className="alert alert-success col-xs-offset-1 col-xs-10">
                                                You have been logged out.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User name */}
                        <div style={{ marginBottom: '25px' }} className="input-group">
                            <input type="text" name="username" placeholder="username" className="form-control" value={username}  onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '25px' }} className="input-group">
                            <input type="password" name="password" placeholder="password" className="form-control" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                          

                        <div style={{ textAlign: 'right', fontSize: '12px' }}>
                        
                              <li className='nav-item d-flex justify-content-end m-0' style={{listStyle: 'none' }}>
                                {userType === 'Patient Entry' && (
                                <p>Don't have an account ?</p>
                                )}
                              </li>
                              
                        </div>
                        {/* Login/Submit Button */}
                        <div  className="row" >
                            <div className="form-group col-lg-6 col-md-12 d-flex justify-content-center">
                                <button type="button" className="btn btn-success w-100 px-5 my-1 " onClick={handleSignInClick}>Login</button>
                            </div>    
                            
                            <div className="form-group col-lg-6 col-md-12 d-flex justify-content-center">
                            
                              <li className='nav-item d-flex justify-content-center w-100 my-1' style={{listStyle: 'none' }}>
                                {userType === 'Patient Entry' && (
                                
                                  <a type="button" className="btn btn-success w-100 px-5"  href="/signUp">Sign Up</a>
                              
                                )}
                              </li>
                                                         
                            </div>
                            
                        </div>
                      </form>

                  </div>
                </div>
              </div>)} 
          </div>
        </div>       
      </>
    );
};

export default SignInForm;
