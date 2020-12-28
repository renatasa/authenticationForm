import React from 'react' ;
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import './ErrorMessage.css';

export const errorMessage=(props)=> {
    let error=null;
    let errorMessage=null;
    if(props.error){
         error=props.error;
         errorMessage=props.error.message;
         setTimeout( () => props.onResetError(), 2000 )
    }

        return (
            <div>
                <div class={props.error ? "alert_wrapper" : undefined} >
				<div class={props.error? "alert_backdrop" : undefined} onClick={props.onResetError}></div>
					<div class={props.error ? "alert_item alert_error" :  "inactive"}> 
						<div class="icon data_icon">
							<i class="fas fa-bomb"></i>
						</div>
						<div class="data">
							<p class="title"><span>Error</span></p>
							<p class="sub">{errorMessage ? errorMessage : undefined}</p>
						</div>
						<div class="icon close" onClick={props.onResetError}>
							<i class="fas fa-times"></i>
						</div>
					</div>
				</div>
			</div>
        )
    
}

const mapStateToProps=state=>{
    return{
        error: state.error
    }
}



const mapDispatchToProps=dispatch=>{
    return{
        onResetError: ()=> dispatch(actions.resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorMessage);