import React from 'react';

import './signin-signout-page.scss';
import SignIn from '../../components/sign-in/sign-in.component.jsx';
import SignUp from '../../components/signup/sign-up.component.jsx';


const SignInSignUpPage = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
    </div>

)

export default SignInSignUpPage;