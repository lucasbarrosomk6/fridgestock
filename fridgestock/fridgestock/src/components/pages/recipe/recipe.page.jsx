import React, { Component } from 'react'

export default class Recipe extends Component {
 
    render() {
        const {recipeId} = this.props.match.params;
        return (
            <div className="recipe-container">
                <h1>hello! this is a recipe container</h1>
                <p>{recipeId}</p>
            </div>
        )
    }
}
