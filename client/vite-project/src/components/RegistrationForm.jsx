import React from 'react';
import './RegistrationForm.css'
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export const RegistrationForm = () => {
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
            <h1>Registration Form</h1>
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

                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        id='email' 
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.email?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='first_name'>First Name</label>
                    <input 
                        type='text' 
                        id='first_name' 
                        {...register("first_name", {
                            required: {
                                value: true,
                                message: "First name is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.first_name?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='last_name'>Last Name</label>
                    <input 
                        type='text' 
                        id='last_name' 
                        {...register("last_name", {
                            required: {
                                value: true,
                                message: "Last name is required."
                            }
                        })} 
                    />
                    <p className='error'>{errors.last_name?.message}</p>
                </div>

                <button type='submit'>Register</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};
