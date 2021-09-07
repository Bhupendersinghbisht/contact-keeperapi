import React,{Fragment} from 'react'
import spinnner from './spinner.gif'



function Spinner() {
    return (
        <Fragment>
            <img src={spinnner} alt="Loading.."
            style={{width:'200px',margin:'auto',display:'block'}}
             />
        </Fragment>
    )
    }

export default Spinner
