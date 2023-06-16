import React from "react";
import { useSelector } from "react-redux";
import './modal.css'

export const Modal = ({  children }) => {
  const {modalActiv} = useSelector(s=>s.modal)

  return <div className={modalActiv ? 'modal active' : 'modal'} >
    
    <div className="modal__content" >
      {children}
    </div>
  </div>
}