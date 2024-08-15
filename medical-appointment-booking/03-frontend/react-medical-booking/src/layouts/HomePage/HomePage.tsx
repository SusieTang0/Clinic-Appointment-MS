import React, { useState } from 'react';

import SignInForm from './Components/SignInForm';



const HomePage: React.FC = () =>{

  const [userType, setUserType] = useState<string | null>(null);

    const handleSelectUserType = (eventKey: string | null) => {
      setUserType(eventKey);
    };
    
  return (
    <>
      <div className="w-100 bg-dark" style={{ margin: '50px 0 20px auto' }}>
        <div className="d-flex justify-content-center pt-4">
          <img src={require("./../../Images/Logo/clinic-logo.png")} height="80px" alt="Logo" />
        </div>
        <div className="d-flex justify-content-center pb-3">
          <h1 style={{ color: 'white' }}>Smith Medical Center</h1>
        </div>
        <hr className="border border-2 w-80" style={{ color: '#284373' }} />

        <div className="d-flex justify-content-center pb-4">
          <h4 style={{ color: 'grey' }}><i>The Best Medical Center</i></h4>
        </div>
      </div>
      
      <SignInForm  onClose={function (): void {
        throw new Error('Function not implemented.');
      } }/>
    </>
  );
};

export default HomePage;



