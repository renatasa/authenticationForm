import React from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './SignOutButton.css';

export const  signOutButton=(props)=> {
    let authRedirect=null;
    console.log('sign out btns');

    if (props.authRedirection=='/'){
        authRedirect= <Redirect to='/' /> ;
    }

        return (
                <div>
                <div class="signOutIcon" onClick={props.onLogout}>
                     {authRedirect}
                     <i class="fas fa-outdent"></i>
                </div>
                </div>
        )
    
}

const mapStateToProps=state=>{
    return{
        authRedirection: state.auth.authRedirection
    }
}


const mapDispatchToProps=dispatch=>{
    return{
        onLogout: ()=> dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signOutButton);