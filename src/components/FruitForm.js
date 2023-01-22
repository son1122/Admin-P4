import React, { useState } from "react"
import axios from "axios"

const FruitForm = props => {

    const [fruitData, setFruitData] = useState({})

    const handleChange = (e) => {
        setFruitData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = fruitData

        data.readyToEat = fruitData.readyToEat === "on" ? true : false
        console.log(data);
        axios.post("https://backend-sei-project-3.cyclic.app/fruits", data)
        .then(res => {
            console.log(res)
        })
    }

    return (
        <div>
            <h2>Create New Fruit</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange}  placeholder="name"/>
                <input type="text" name="color" onChange={handleChange}  placeholder="color"/>
                <input type="checkbox" name="readyToEat" onChange={handleChange}  placeholder="readyToEat"/>
                <input type="text" name="userId" onChange={handleChange} placeholder="userId"/>
                <input type="submit" value="Create Fruit"/>
            </form>
        </div>
    )
}

export default FruitForm