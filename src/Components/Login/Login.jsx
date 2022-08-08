import axios from 'axios';
import Joi from 'joi';
import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
  
  let [user , setUser] = useState(
    {
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
      function goToHome(){
        myNavigate('/home');
      }
  
    function validateForm(){
      let schema = Joi.object({
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
        let {data}= await axios.post('https://routeegypt.herokuapp.com/signin',user);
        if(data.message=='success'){
          localStorage.setItem('userToken',data.token);
          props.saveUserData();
          goToHome();
        }
        else{
          seterrorMessage(data.message);
        }
      }
      setLoading(false);
    }
    return (
      <div className='p-5'>
      <h3>Login form</h3>
      {validationError.map((vError , index)=><h6 key={index} className='alert alert-danger'>{vError.message}</h6>)}
      {errorMessage?<h6 className='alert alert-danger'>{errorMessage}</h6>:''}
        <div className='input-gp'>
          <form onSubmit={submitFormData}>
  
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
