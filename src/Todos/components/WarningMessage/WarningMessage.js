import React from 'react' ;
import './WarningMessage.css';

export const warningMessage=(props)=> {
  if(props.showWarning) { setTimeout( () => props.closeWarning(), 3000 ) }

        return (
            <div>
                <div class={props.showWarning ? "alert_wrapper" : undefined} >
					<div class={props.showWarning ? "alert_item_warning alert_warning" :  "inactive_warning"}> 
						<div class="icon data_icon">
							<i class="fas fa-exclamation-triangle"></i>
						</div>
						<div class="data">
							<p class="title"><span>Warning</span></p>
							<p class="sub">Input field is empty!</p>
						</div>
						<div class="icon close" onClick={props.closeWarning}>
							<i class="fas fa-times"></i>
						</div>
					</div>
				</div>
			</div>
        )
    
}


export default warningMessage;