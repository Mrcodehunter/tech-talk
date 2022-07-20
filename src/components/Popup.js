import React from "react";
import classes from '../styles/Popup.module.css';
 
export default function Popup ({...props}) {
    console.log(props);
    
  return (
    <div className={classes.popup}>
      <div className={classes.box}>
        <span className={classes.closeIcon} onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
