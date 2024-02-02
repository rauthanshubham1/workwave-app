import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import jscookie from "js-cookie"
import LoadingBar from 'react-top-loading-bar'

const Login = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [btnLabel, setBtnLabel] = useState(1);  // true for employee
  const [employeeLoginDetails, setEmployeeLoginDetails] = useState({ employeeEmailLogin: "", employeePasswordLogin: "" });
  const [enterpriseLoginDetails, setEnterpriseLoginDetails] = useState({ enterpriseEmailLogin: "", enterprisePasswordLogin: "" });

  const checkAuthentication = async (sessionToken) => {
    try {
      console.log(sessionToken);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/verifyUser?sessionToken=${sessionToken}`, { withCredentials: true });
      if (response.status === 200) {
        localStorage.setItem("isEmployee", response.data.Message);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    const sessionToken = jscookie.get("sessionToken");
    if (sessionToken) {
      checkAuthentication(sessionToken);
    }
  }, [])

  const handleFormInputs = (e) => {
    if (btnLabel) {
      const name = e.target.name;
      const value = e.target.value;
      setEmployeeLoginDetails({ ...employeeLoginDetails, [name]: value });
    } else {
      const name = e.target.name;
      const value = e.target.value;
      setEnterpriseLoginDetails({ ...enterpriseLoginDetails, [name]: value });
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setProgress(70);
    if (btnLabel) {
      //  For employee
      try {
        const email = employeeLoginDetails.employeeEmailLogin;
        const password = employeeLoginDetails.employeePasswordLogin;

        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/loginEmployee`, { email, password }, { withCredentials: true });
        if (response.status === 200) {
          localStorage.setItem("isEmployee", true);
          jscookie.set('sessionToken', response.data.sessionToken, { expires: 7 });
          console.log("Login successful");
          navigate("/");
        }
        setProgress(100);
      } catch (err) {
        setProgress(100);
        console.log(err);
        alert("Invalid Credentials");
      }
    } else {
      //  For enterprise
      try {
        const email = enterpriseLoginDetails.enterpriseEmailLogin;
        const password = enterpriseLoginDetails.enterprisePasswordLogin;

        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/loginEnterprise`, { email, password }, { withCredentials: true });
        if (response.status === 200) {
          localStorage.setItem("isEmployee", false);
          jscookie.set('sessionToken', response.data.sessionToken, { expires: 7 });
          console.log("Login successful");
          navigate("/");
        }
        setProgress(100);
      } catch (err) {
        setProgress(100);
        console.log(err);
        alert("Invalid Credentials");
      }
    }
  }

  return (
    <div className='loginContainer' >
      <LoadingBar color={"red"} progress={progress}
        onLoaderFinished={() => setProgress(0)} />
      <div className='loginContainerChild'>
        <div className='pageName'>Login</div>

        <div className='loginBtns'>
          <button className="button-26" id='employeeLogin' onClick={() => { setBtnLabel(1) }}>
            Employee Login
          </button>
          <button className="button-26" id='enterpriseLogin' onClick={() => { setBtnLabel(0) }}>
            Enterprise Login
          </button>
        </div>

        {
          btnLabel ?
            (
              <div className="formContainer">
                <h4>Login as <p>Employee</p></h4>

                <form method='post'>
                  <div className="emailDiv">
                    <label htmlFor="employeeEmailLogin">Employee ID</label>
                    <input
                      type="email"
                      className='formInputs'
                      id='employeeEmailLogin'
                      placeholder='Enter Employee ID'
                      onChange={handleFormInputs}
                      name='employeeEmailLogin'
                      value={employeeLoginDetails.employeeEmailLogin}
                      autoComplete='off'
                    />
                  </div>
                  <div className="passwordDiv">
                    <label htmlFor="employeePasswordLogin" >Password</label>
                    <input
                      type="password"
                      className='formInputs'
                      id='employeePasswordLogin'
                      placeholder='Enter Password'
                      onChange={handleFormInputs}
                      name="employeePasswordLogin"
                      value={employeeLoginDetails.employeePasswordLogin}
                      autoComplete='off'
                    />
                  </div>
                  <button
                    type="submit"
                    className='button-33'
                    name="employeeFormSubmit"
                    onClick={handleFormSubmit}
                  >
                    Login
                  </button>

                </form>
              </div>
            ) :
            (
              <div className="formContainer">
                <h4>Login as <p>Enterprise</p></h4>

                <form method='get'>
                  <div className="emailDiv">
                    <label htmlFor="enterpriseEmailLogin">Enterprise ID</label>
                    <input
                      type="email"
                      name="enterpriseEmailLogin"
                      className='formInputs'
                      id='enterpriseEmailLogin'
                      placeholder='Enter Enterprise ID'
                      onChange={handleFormInputs}
                      value={enterpriseLoginDetails.enterpriseEmailLogin}
                      autoComplete='off'
                    />
                  </div>
                  <div className="passwordDiv">
                    <label htmlFor="enterprisePasswordLogin">Password</label>
                    <input
                      type="password"
                      name="enterprisePasswordLogin"
                      className='formInputs'
                      id="enterprisePasswordLogin"
                      placeholder='Enter Password'
                      onChange={handleFormInputs}
                      value={enterpriseLoginDetails.enterprisePasswordLogin}
                      autoComplete='off'
                    />
                  </div>
                  <button
                    type="submit"
                    className='button-33'
                    name="enterpriseFormSubmit"
                    onClick={handleFormSubmit}
                  >
                    Login
                  </button>
                </form>

              </div>
            )
        }

        <div>Don't have an account? <Link to="/signup">Sign Up</Link> </div>
      </div>
    </div >
  )
}

export default Login

