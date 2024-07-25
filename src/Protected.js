import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from './LoginContext'
function Protected(props) {
//     const{loginstatus,setLoginstatus}=useContext(LoginContext)
const loginstatus =localStorage.getItem("loginStatus")
    const{Component}=props
    let navigate= useNavigate()
    useEffect(()=>{
        if(!loginstatus){
             navigate('/login')
        }
    })
    return ( 
        
     <div>
<Component/>
     </div>
     );
}

export default Protected;