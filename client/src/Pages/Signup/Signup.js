import React, { useState } from 'react'
import axios from 'axios'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate()
    const [btnLabel, setBtnLabel] = useState(1);  // true for employee
    const [employeeSignupDetails, setEmployeeSignupDetails] =
        useState(
            {
                employeeNameSignup: "",
                employeePhoneSignup: "",
                employeeEmailSignup: "",
                employeePasswordSignup: ""
            }
        );
    const [enterpriseSignupDetails, setEnterpriseSignupDetails] =
        useState(
            {
                enterpriseNameSignup: "",
                enterprisePhoneSignup: "",
                enterpriseEmailSignup: "",
                enterprisePasswordSignup: ""
            }
        );

    const handleFormInputs = (e) => {
        if (btnLabel) {
            const name = e.target.name;
            const value = e.target.value;
            setEmployeeSignupDetails({ ...employeeSignupDetails, [name]: value });
        } else {
            const name = e.target.name;
            const value = e.target.value;
            setEnterpriseSignupDetails({ ...enterpriseSignupDetails, [name]: value });
        }
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (btnLabel) {
            //  For employee
            try {
                const name = employeeSignupDetails.employeeNameSignup;
                const phone = employeeSignupDetails.employeePhoneSignup;
                const email = employeeSignupDetails.employeeEmailSignup;
                const password = employeeSignupDetails.employeePasswordSignup;

                const response = await axios.post(`${process.env.REACT_APP_BACKEND}/signupEmployee`, { name, phone, email, password });
                if (response.status === 201) {
                    navigate("/login");
                    console.log("Signup successful");
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            //  For enterprise
            try {
                const name = enterpriseSignupDetails.enterpriseNameSignup;
                const phone = enterpriseSignupDetails.enterprisePhoneSignup;
                const email = enterpriseSignupDetails.enterpriseEmailSignup;
                const password = enterpriseSignupDetails.enterprisePasswordSignup;

                const response = await axios.post(`${process.env.REACT_APP_BACKEND}/signupEnterprise`, { name, phone, email, password });
                if (response.status === 201) {
                    navigate("/login");
                    console.log("Signup successful");
                }
            } catch (err) {
                console.log(err)
            }
        }
    }




    return (
        <div className='signupContainer' >
            <div className='signupContainerChild'>
                <div className='pageName'>SignUp</div>

                <div className='signupBtns'>
                    <button className="button-26" id='employeeSignup' onClick={() => { setBtnLabel(1) }}>Employee SignUp</button>
                    <button className="button-26" id='enterpriseSignup' onClick={() => { setBtnLabel(0) }}>Enterprise SignUp</button>
                </div>

                {
                    btnLabel ?
                        (
                            <div className="formContainer">
                                <h4>SignUp as <p>Employee</p></h4>
                                <form method="post">
                                    <div className="nameDiv">
                                        <label htmlFor="employeeNameSignup">Name</label>
                                        <input
                                            type="text"
                                            className='formInputs'
                                            placeholder='Enter name'
                                            id='employeeNameSignup'
                                            name='employeeNameSignup'
                                            onChange={handleFormInputs}
                                            value={employeeSignupDetails.employeeNameSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="nameDiv">
                                        <label htmlFor="employeePhoneSignup">Phone No.</label>
                                        <input
                                            type="text"
                                            className='formInputs'
                                            placeholder='Enter phone no.'
                                            id="employeePhoneSignup"
                                            name="employeePhoneSignup"
                                            onChange={handleFormInputs}
                                            value={employeeSignupDetails.employeePhoneSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="emailDiv">
                                        <label htmlFor="employeeEmailSignup">Employee ID</label>
                                        <input
                                            type="email"
                                            className='formInputs'
                                            placeholder='Enter ID'
                                            id="employeeEmailSignup"
                                            name="employeeEmailSignup"
                                            onChange={handleFormInputs}
                                            value={employeeSignupDetails.employeeEmailSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="passwordDiv">
                                        <label htmlFor="employeePasswordSignup" >Password</label>
                                        <input
                                            type="password"
                                            className='formInputs'
                                            placeholder='Enter password'
                                            id='employeePasswordSignup'
                                            name='employeePasswordSignup'
                                            onChange={handleFormInputs}
                                            value={employeeSignupDetails.employeePasswordSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <button type="submit" className='button-33' onClick={handleFormSubmit}>SignUp</button>
                                </form>
                            </div>
                        ) :
                        (
                            <div className="formContainer">
                                <h4>SignUp as <p>Enterprise</p></h4>
                                <form method="post">
                                    <div className="nameDiv">
                                        <label htmlFor="enterpriseNameSignup">Name</label>
                                        <input
                                            type="text"
                                            className='formInputs'
                                            placeholder='Enter name'
                                            id='enterpriseNameSignup'
                                            name='enterpriseNameSignup'
                                            onChange={handleFormInputs}
                                            value={enterpriseSignupDetails.enterpriseNameSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="nameDiv">
                                        <label htmlFor="enterprisePhoneSignup">Phone No.</label>
                                        <input
                                            type="text"
                                            className='formInputs'
                                            placeholder='Enter phone no.'
                                            id='enterprisePhoneSignup'
                                            name='enterprisePhoneSignup'
                                            onChange={handleFormInputs}
                                            value={enterpriseSignupDetails.enterprisePhoneSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="emailDiv">
                                        <label htmlFor="enterpriseEmailSignup">Enterprise ID</label>
                                        <input
                                            type="email"
                                            className='formInputs'
                                            placeholder='Enter ID'
                                            id='enterpriseEmailSignup'
                                            name='enterpriseEmailSignup'
                                            onChange={handleFormInputs}
                                            value={enterpriseSignupDetails.enterpriseEmailSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="passwordDiv">
                                        <label htmlFor="enterprisePasswordSignup" >Password</label>
                                        <input
                                            type="password"
                                            className='formInputs'
                                            placeholder='Enter password'
                                            id='enterprisePasswordSignup'
                                            name='enterprisePasswordSignup'
                                            onChange={handleFormInputs}
                                            value={enterpriseSignupDetails.enterprisePasswordSignup}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <button type="submit" className='button-33' onClick={handleFormSubmit}>SignUp</button>
                                </form>
                            </div>
                        )
                }

                <div>Already have an account? <Link to="/login">Log In</Link> </div>
            </div>
        </div >
    )
}

export default Signup;