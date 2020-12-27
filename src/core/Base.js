import React from 'react'
import Menu from './Menu'
import "../styles.css"
export default function Base({
    title = "My title",
    description="My description",
    // className="text-white p-4",
    children
}) {
    return (
        <div>
            <Menu/>
            <div className="containe">
                {/* <div className="jumbotron text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div> */}
                
                {children}

            </div>
            <div className="footers">
            <p>Snag and grab all the ones you love!</p>
            {/* <p>copyright @2020</p> */}
            {/* <div className="social">
                <i className="fa fa-facebook"></i>
                <i className="fa fa-instagram"></i>
            </div> */}
        </div>
        </div>
    )
}
