import React from 'react' ;
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './LogedIn.css';

export const logedIn=(props)=> {
    let authRedirect=null;

    if (props.authRedirection=='/'){
        authRedirect= <Redirect to='/' /> ;
    }

        return (
            <div class="logedin">
                {authRedirect}
               <div class="text"> Successfull login</div>
                <button class="logedin__button" onClick={props.onLogout}>Logout</button>
			</div>
        )
    
}

const mapStateToProps=state=>{
    return{
        authRedirection: state.authRedirection
    }
}



const mapDispatchToProps=dispatch=>{
    return{
        onLogout: ()=> dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(logedIn);