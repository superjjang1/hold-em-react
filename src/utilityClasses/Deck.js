// no extend because this is not a component, just some OOP JavaScript
class Deck{
    constructor(){
        //no need to call super, because... no extend
        this.cards =[];
    }
    create(){
        //i make a new deck of cards from nothing.container
        console.log('newdeck')
        const suits = ['h', 's', 'd', 'c'];
        suits.forEach((suit)=>{
            // inner loop for value
            for(let c=1; c<=13; c++){
                //push on this deck, c + suit
                this.cards.push(c+suit);
            }
        })

    }
    shuffle(){
        //i take a new deck of cards and shuffle them.
        console.log('shufflin');
    }
}
export default Deck;