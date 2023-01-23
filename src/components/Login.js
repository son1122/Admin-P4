import React, { useState } from "react"
import axios from "axios"

const Login = props => {

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.post("https://good-puce-kitten-sari.cyclic.app/admin/login", formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
        })
        .then(res => {
            console.log(res.data);
            let token = res.data
            localStorage.setItem("jwt", token)
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange}  placeholder="username"/>
                <input type="text" name="password" onChange={handleChange}  placeholder="password"/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login