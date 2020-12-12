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
            <div className="wrapper">
                {/* <div className="jumbotron text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div> */}
                {children}

            </div>
            <footer className="footer mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An amazing <span className="text-white">MERN</span> bootcamp
                    </span>
                </div>
            </footer>
        </div>
    )
}
