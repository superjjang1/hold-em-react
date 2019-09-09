import React from 'react';

//my job to show card
function Card(props){
    const thisCard = `/cards/${props.card}.png`
    return(
        <div className="col-sm-2 card">
        <img src={thisCard}/>
        </div>
    )
}

export default Card;