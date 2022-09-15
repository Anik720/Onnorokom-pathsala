import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import useToken from '../Hooks/useToken';

const Login = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [userr, loadingg, errorr] = useAuthState(auth);
  //const [token] = useToken(user );
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';
//   useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
//   }, [token, from, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let showError;
  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
    const data1 = {email: data.email, password: data.password };

    fetch("http://localhost:7000/api/auth/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((response) => response.json())
      .then((data2) => {
        console.log("Success:", data2);
        let accessToken=data2.token
        console.log("Success:", data2.token);
        localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (error || gerror) {
    showError = <p>Error: {error.message || gerror.message}</p>;
  }
  if (loading) {
    return (
      <div class='flex items-center justify-center '>
        <div class='w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <div>
      <div class='hero min-h-screen bg-base-200'>
        <div class='hero-content flex-col lg:flex-row-reverse'>
          <div class='text-center lg:text-left'>
            <h1 class='text-5xl font-bold'>Login now!</h1>
            <p class='py-6'>
              Welcome. Have the best experince by logging in our website. You
              will get your desire items and will be able to have the best
              service.
            </p>
          </div>

          <div class='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class='card-body'>
                <div class='form-control'>
                  <label class='label'>
                    <span class='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='Your Email'
                    class='input input-bordered'
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: 'Provide a valid Email',
                      },
                    })}
                  />
                  <label class='label'>
                    {errors.email?.type === 'required' && (
                      <span className='label-text-alt text-red-500'>
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email?.type === 'pattern' && (
                      <span className='label-text-alt text-red-500'>
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                <div class='form-control'>
                  <label class='label'>
                    <span class='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    placeholder='Your Password'
                    class='input input-bordered'
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'password is required',
                      },
                      pattern: {
                        maxLength: 20,
                        message: 'Provide a valid Password',
                      },
                    })}
                  />
                  <label class='label'>
                    {errors.password?.type === 'required' && (
                      <span className='label-text-alt text-red-500'>
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === 'minLength' && (
                      <span className='label-text-alt text-red-500'>
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                  <p>{showError}</p>
                  <label class='label'>
                    <a href='#' class='label-text-alt link link-hover'>
                      Forgot password?
                    </a>
                  </label>
                  <label>
                    <Link to='/signup'>
                      <button className=''>
                        Are you a new user? Sign Up here.
                      </button>
                    </Link>
                  </label>
                </div>
                <div class='form-control mt-6'>
                  <button type='submit' class='btn btn-primary'>
                    Login
                  </button>
                </div>
              </div>
            </form>
           
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;