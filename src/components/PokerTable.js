import React, {Component} from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';

class PokerTable extends Component {
    constructor(){
        super();
        this.deck = new Deck();
        this.deck.create();
        this.deck.shuffle();
        console.log(this.deck.cards);
        this.state={
            playerHand:[],
            dealerHand:[],
            communityHand: []
        }
    }
    // this method was made by us, not react method
    //in here we deal the first 4 cards
    prepDeck =()=>{
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();
        //at this point, this deck.cards has 48 elements in it
        //be cause we removed 4
        this.setState({
            playerHand: [card1, card3],
            dealerHand: [card2, card4]
            
        })
    };
    render(){
        return(
            <div className='the-table col-sm-12'>
                <PokerHand cards={this.state.playerHand} /> {/*player 1 hand*/}
                <PokerHand cards={this.state.communityHand}/> {/* community hand*/}
                <PokerHand cards={this.state.dealerHand} /> {/*player 2*/}
                <button onClick={this.prepDeck} className="btn btn-primary">start</button>
            </div>
        )
    }
}


export default PokerTable;