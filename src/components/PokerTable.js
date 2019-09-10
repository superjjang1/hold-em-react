import React, { Component } from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';

class PokerTable extends Component {
    constructor() {
        super();
        this.deck = new Deck();
        this.deck.create();
        this.deck.shuffle();
        // console.log(this.deck.cards)
        this.state = {
            dealerHand: ['deck', 'deck'],
            playerHand: ['deck', 'deck'],
            communityHand: [],
            wager: 0, 
            bankroll: 100,
            msg:''
        }
    }

    checkHandRank = () => {
        const playerPlusComm = this.pokerfyHand([...this.state.playerHand, ...this.state.communityHand]);
        const dealerPlusComm = this.pokerfyHand([...this.state.dealerHand, ...this.state.communityHand]);
        const playerHandRank = window.Hand.solve(playerPlusComm);
        const dealerHandRank = window.Hand.solve(dealerPlusComm);
        console.log(playerHandRank);
        console.log(dealerHandRank);

        this.findWinner(playerHandRank, dealerHandRank);
    }

    findWinner = (hand1, hand2) => {
        const winnerArr = window.Hand.winners([hand1, hand2]);
        console.log(winnerArr);
        console.log(winnerArr.length > 1)
        console.log(winnerArr[0].descr === hand1.descr)
        console.log(winnerArr[0].descr === hand2.descr)
        console.log(winnerArr[0].descr === hand1.descr && winnerArr[0].descr === hand2.descr)
        if (winnerArr.length > 1 || (winnerArr[0].descr === hand1.descr && winnerArr[0].descr === hand2.descr)) {
            this.setState( {
                msg: 'Game is a Draw'
            }, this.clearMsg)
        } else if ( winnerArr[0].descr === hand1.descr) {
            this.setState( {
                msg: 'Player Wins!'
            }, this.clearMsg)
        } else if (winnerArr[0].descr === hand2.descr) {
            this.setState( {
                msg: 'Dealer Wins!'
            }, this.clearMsg)
        }
    }

    pokerfyHand = (hand) => {
        const newHand = hand.map( card => {
            if( card.substring(0,2) === '10') {
                return ('T'+card[2])
            } else if ( card.substring(0,2) === '11') {
                return ('J'+card[2])
            } else if ( card.substring(0,2) === '12') {
                return ('Q'+card[2])
            } else if ( card.substring(0,2) === '13') {
                    return ('K'+card[2])
            } else if ( card[0] === '1') {
                return ('A'+card[1])
            } else {
                return card
            }
        })
        return newHand
    }


    prepDeck = () => {
        this.deck = new Deck();
        this.deck.create();
        this.deck.shuffle();
        // const burn = this.deck.cards.shift();
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();

        this.setState({
            dealerHand: [card1, card3],
            playerHand: [card2, card4],
            communityHand:[]
        })
    }

    bet = (amount) => {
        const newWager = this.state.wager + amount;
        const newBankRoll = this.state.bankroll - amount;
        if (newBankRoll >= 0) {
            this.setState({
                wager:newWager,
                bankroll: newBankRoll
            })
        } else {
            this.setState({
                msg: "You don't have enough money!"
            }, this.clearMsg)
        }
    }

    clearMsg = () => {
        setTimeout( () => { this.setState({ msg: "" })}, 2000)
    }

    check = () => {
        let communityNewHand = [...this.state.communityHand];
        if (this.state.dealerHand[0] === 'deck' || communityNewHand.length === 5) {

        } else if (communityNewHand.length === 0 ) {
            communityNewHand = [    
                this.deck.cards.shift(),
                this.deck.cards.shift(),
                this.deck.cards.shift()
            ]
        } else {
            communityNewHand.push(this.deck.cards.shift())
        }
        this.setState({
            communityHand: communityNewHand
        }, this.fullCommunityHand)
    }

    fullCommunityHand = () => {
        console.log(this.state.communityHand)
        if ( this.state.communityHand.length === 5 ) {
            this.checkHandRank();
        }
    }



    render() { 
        // console.log(this.state.dealerHand)
        // console.log(this.state.playerHand)
        // console.log(this.state.communityHand)
        return (
            <div className='the-table col-sm-12'> 
                <div className='col-sm-12 text-center the-numbers'>
                    <div className='col-sm-4 col-sm-offset-1'>
                        Current Pot: ${this.state.wager}
                    </div>
                    <div className='col-sm-4 col-sm-offset-2'>
                        Bankroll: ${this.state.bankroll}
                    </div>
                </div>
                <div className='player-message'>
                    {this.state.msg}
                </div>
                <h1>Dealer Hand:</h1>
                <PokerHand cards={this.state.dealerHand} />
                <PokerHand cards={this.state.communityHand} />
                <h1>Player Hand:</h1>
                <PokerHand cards={this.state.playerHand} />
                <div className='col-sm-12 buttons'>
                    <button onClick={this.prepDeck} className='btn btn-primary'>
                        Deal
                    </button>
                    <button onClick={() => {this.bet(5)}} className='btn btn-success'>
                        Bet 5
                    </button>
                    <button onClick={this.check} className='btn btn-warning'>
                        Check
                    </button>
                    <button onClick={this.prepDeck} className='btn btn-danger'>
                        Fold
                    </button>
                </div>
            </div>
        );
    }
}
 
export default PokerTable;