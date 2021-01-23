import { Redirect, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import Signin from '../components/Signin/Index';

function AuthenticatedRouting({path, components}) {
    let cookies = new Cookies();
    let jwtToken = cookies.get('jwt')
    if(path==='/signin' && jwtToken ) {
        return(
            <Redirect to='/' />
        );
    }
    else if(jwtToken){
        let componentsList = components?.map((component, index) => {
            return (<span key={index}>{component}</span>)
        })
        return (
            <Route path={path}>
                {componentsList}
            </Route>
        )
    } else {
        return (
            <Route path={path}>
                <Signin />
            </Route>
        )
    }
    
}

export default AuthenticatedRouting;