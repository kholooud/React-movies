import axios from 'axios';
import Joi from 'joi';
import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Register() {
  let [user , setUser] = useState(
  {
    first_name: "",
	  last_name: "",
    age: "",
    email: "",
    password: ""
  });
  let [errorMessage , seterrorMessage] = useState();
  let[validationError, setvalidationError] = useState([]);
  let [loading,setLoading]=useState(false);

  function getFormData(e){
    let myUser ={...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
    let myNavigate = useNavigate();
    function goToLogin(){
      myNavigate('/login');
    }

  function validateForm(){
    let schema = Joi.object({
      first_name : Joi.string().required().alphanum().min(3).max(10),
      last_name : Joi.string().required().alphanum().min(3).max(10),
      age: Joi.number().min(20).max(80),
      email : Joi.string().required().email({tlds:{allow: false}}),
      password :Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    })
    return schema.validate(user,{abortEarly:false});
  }

  async function submitFormData(e){
    e.preventDefault();
    setLoading(true);
    let validateResponse = validateForm();
    console.log(validateResponse);
    if (validateResponse.error){
      setvalidationError(validateResponse.error.details)
    }else{
      let {data}= await axios.post('https://routeegypt.herokuapp.com/signup',user);
      if(data.message=='success'){
        goToLogin();
      }
      else{
        seterrorMessage(data.message);
      }
    }
    setLoading(false);
  }
  return (
    <div className='p-5'>
    <h3>Registeration form</h3>
    {validationError.map((vError , index)=><h6 key={index} className='alert alert-danger'>{vError.message}</h6>)}
    {errorMessage?<h6 className='alert alert-danger'>{errorMessage}</h6>:''}
      <div className='input-gp'>
        <form onSubmit={submitFormData}>

          <label className='my-2' htmlFor="first_name">FirstName:</label>
          <input onChange={getFormData} className='form-control ' type="text" placeholder='FirstName' name='first_name' />

          <label className='my-2' htmlFor="last_name">LastName:</label>
          <input onChange={getFormData} className='form-control' type="text" placeholder='LastName' name='last_name'/>

          <label className='my-2' htmlFor="age">Age:</label>
          <input onChange={getFormData} className='form-control' type="number" placeholder='Age' name='age' />

          <label className='my-2' htmlFor="email">Email:</label>
          <input onChange={getFormData} className='form-control' type="email" placeholder='Email' name='email' />

          <label className='my-2' htmlFor="password">Password:</label>
          <input onChange={getFormData} className='form-control' type="password" placeholder='Password' name='password'/>

          <button type='submit' className='btn btn-primary my-3 float-end'>
            {loading?<i className="fa fa-spinner fa-spin"></i>:"Submit"}
          </button>
          <div className='clear-fix'></div>
        </form>
      </div>
    </div>
  )
}
