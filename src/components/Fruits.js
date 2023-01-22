import React from "react"
import FruitForm from "./FruitForm"

const Fruit = props => {
    const allFruits = props.fruits.map(fruit => {
        return (
            <div>
                <p>Name: {fruit.name}</p>
                <p>Color: {fruit.color}</p>
                <p>Is {fruit.readyToEat ? "ready" : "not ready"} to eat.</p>
            </div>
        )
    })

    return (
        <div>
            <h1>Fruits</h1>
            <FruitForm />
            <div>{allFruits}</div>
        </div>
    )
}

export default Fruit