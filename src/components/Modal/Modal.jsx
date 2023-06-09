import React from "react";
import './modal.css'

export const Modal = ({ modalActiv, children }) => {

  return <div className={modalActiv ? 'modal active' : 'modal'} >
    
    <div className="modal__content" >
      {children}
    </div>
  </div>
}