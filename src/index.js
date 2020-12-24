import React from 'react'
import Routes from './Routes'
import ReactDOM from "react-dom"
import {firebaseConfig} from "./firebaseConfig"
import firebase from "firebase/app"
firebase.initializeApp(firebaseConfig);
ReactDOM.render(<Routes/>,document.getElementById('root'))