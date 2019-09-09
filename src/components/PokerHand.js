import React from 'react';
import Card from './Card';

//job is to show a hand of cards

function PokerHand(props){
    return(
    <div className="poker-hand col-sm-12">
        <Card />
        <Card />
    </div>
    )
}

export default PokerHand;