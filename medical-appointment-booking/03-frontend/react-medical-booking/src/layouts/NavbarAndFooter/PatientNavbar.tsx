import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../PatientPage/Components/ProfileModal';



export const Navbar: React.FC=  () => {
  const [showMyProfileForm, setShowMyProfile] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      window.localStorage.clear();
      navigate('/');
    }
  };

  const handleCloseModal = () => {
    setShowMyProfile(false);
  };

  const handleShowModal = () => {
    setShowMyProfile(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0 py-3 px-2" href="/books/list">
              <img
                src={require('./../../Images/Logo/clinic-logo.png')}
                height="80"
                alt="Logo"
                loading="lazy"
              />
              <h1>Smith Medical Center</h1>
            </a>
          </div>

          <div className="d-flex align-items-center">
            <div>
              <button className="btn btn-secondary text-reset me-3" onClick={handleShowModal}>
                My profile
              </button>
              <ProfileModal show={showMyProfileForm} handleClose={handleCloseModal} />
            </div>
            <div>
              <button className="btn btn-secondary text-reset me-3" onClick={logout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
