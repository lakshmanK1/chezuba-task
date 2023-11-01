import { useAuth } from "./contextapi/AuthContext"
import {Navigate} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function RequireAuth({children}) {
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to='/login'/>
    }

  return children
}

export default RequireAuth