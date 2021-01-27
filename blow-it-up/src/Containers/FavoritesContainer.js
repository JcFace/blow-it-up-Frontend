import React, {Component} from "react";
import Favorite from "./Favorite";

class FavoritesContainer extends Component {
    mapFavorites = () => {
        return this.props.favorites.map(fave => 
            <Favorite fave={fave} key={fave.id} /> 
            )
        }
    render() {
        return (
            <div className='favorites-container'>
                <h3>Favorite Blows</h3> 
                {
                    this.mapFavorites()
                }
            </div>
        )
    }
}

export default FavoritesContainer;