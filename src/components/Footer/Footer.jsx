import React from "react";
import "./index.css"
import { ReactComponent as Logo } from "../img/logo.svg"

export const Footer = React.memo( () => {
  return <footer className="footer">
    <div className="footer__wrapper">
    <Logo/>

    </div>
  </footer>
})