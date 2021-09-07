import axios from 'axios'

const setAuthToken = token =>{
    console.log('mytokennn..',token);

if(token){
    axios.defaults.headers.common['x-auth-token']=token
}
else{
    delete axios.defaults.headerscommon['x-auth-token'];
}
}

export default setAuthToken;