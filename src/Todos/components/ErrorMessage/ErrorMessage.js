import React from 'react' ;
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import './ErrorMessage.css';

export const errorMessage=(props)=> {
    let error=null;
    let errorBool=false;

            if (props.fetchTodoError || props.submitTodoError){
                error=props.fetchTodoError;
                errorBool=true;
            } 
            

        return (
            <div>
                <div class={errorBool ? "alert_wrapper" : undefined} >
				<div class="alert_backdrop" onClick={props.onResetError}></div>
					<div class={errorBool ? "alert_item alert_error" :  "inactive"}> 
						<div class="icon data_icon">
							<i class="fas fa-bomb"></i>
						</div>
						<div class="data">
							<p class="title"><span>Error</span></p>
							<p class="sub">{error}</p>
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
        fetchTodoError: state.todos.fetchTodoError,
        submitTodoError: state.todos.submitTodoError
    }
}



const mapDispatchToProps=dispatch=>{
    return{
        onResetError: ()=> dispatch(actions.resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorMessage);