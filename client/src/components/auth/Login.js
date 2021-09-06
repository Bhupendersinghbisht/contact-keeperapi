import React,{useState,useContext} from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
const Login = () => {
    const alertContext=useContext(AlertContext)    
    const {setAlert}=alertContext;
    const authContext=useContext(AuthContext)
    const {login}=authContext;
    const [user,setUser]=useState({
        
        email:'',
        password:'',
        
    })
    const {email,password}=user;
    const onChange = e =>setUser({...user,[e.target.name]:e.target.value})
    const onSubmit= e =>{
        e.preventDefault();
        console.log('Login Submit')
        if(email === '' ||password === ''){
            setAlert('Please enter Credentials','danger')
        }else{
            login({email,password})
        }
    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
         
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
           
            <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login
