import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = (props) => {
    return (
        <div>
            <ul className="right">
                <li><a href={"http://localhost:9000/logout"} onClick={() => (true || props.signOut)}>Log Out</a></li>
                <li><NavLink to='/' className="btn btn-floating pink lighten-1">
                    {props.profile.initials}
                </NavLink></li>
            </ul>
        </div>
    )
}

export default SignedInLinks;