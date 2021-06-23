import React from "react";

const Navigation =({ onroutechange, issignedin }) => {
    if (issignedin === true){
        return (
            <nav style={{display: "flex", justifyContent:"flex-end"}}>
                <p onClick={() => onroutechange('signoutpage')} className='f3 link dim black underline pa3 pointer'>Sign out!</p>
            </nav>
        );
    }
    else{
        return (
            <nav style={{display: "flex", justifyContent:"flex-end"}}>
                <p onClick={() => onroutechange('registrationpage')} className='f3 link dim black underline pa3 pointer'>Register</p>
                <p onClick={() => onroutechange('signinpage')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
            </nav>
        );
    }
}
export default Navigation;