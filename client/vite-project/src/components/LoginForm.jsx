import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export const LoginForm = () => {
    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log("form submitted ", data)
    }

    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};
