import React from 'react';
import './LoginForm.css'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import { DevTool } from "@hookform/devtools";

export default function LoginForm() {
    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log("form submitted ", data)
    }

    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        id='username' 
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Username is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.username?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='text' 
                        id='password' 
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.password?.message}</p>
                </div>
                        
                <button type='submit'>Log In</button>
            </form>
            <Link to="registration"><button>Register</button></Link>
        </div>
    );
};