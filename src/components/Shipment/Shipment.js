import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
  
   // console.log(watch("example")); // watch input value by passing the name of it
  
    return (

     
      <form className="ship_from" onSubmit={handleSubmit(onSubmit)}>

       


        <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="enter your name" />
        {errors.name && <span className="error">Name is required</span>}

        <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="enter your Email" />
        {errors.email && <span className="error">Email is required</span>}

        <input {...register("address", { required: true })} placeholder="enter your Address"/>
        {errors.address && <span className="error">Address is required</span>}

        <input {...register("phoneNumber", { required: true })} placeholder="enter your Phone number" />
        {errors.phoneNumber && <span className="error">Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
  }

export default Shipment;