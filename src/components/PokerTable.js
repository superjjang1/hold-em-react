import React, {Component} from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';

class PokerTable extends Component {
    constructor(){
        super();
        this.deck = new Deck(); //make a new deck object
        this.deck.create(); //create a deck from deck object
        this.deck.shuffle();//shuffle the deck
        console.log(this.deck.cards);
        this.state={
            playerHand:['deck','deck'], //this is the player array of cards
            dealerHand:['deck','deck'], 
            communityHand: ['deck','deck', 'deck','deck','deck'],
            wager: 0,
            bankroll: 100
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
                <div className="col-sm-12 buttons">
                    <button onClick={this.prepDeck} className="btn btn-primary">Deal</button>
                    <button onClick={this.prepDeck} className="btn btn-success">Bet 5</button>
                    <button onClick={this.prepDeck} className="btn btn-warning">Check!</button>
                    <button onClick={this.prepDeck} className="btn btn-danger">Fold</button>
                </div>
            </div>
        )
    }
}


export default PokerTable;