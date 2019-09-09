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
        //to shuffle: swap 2 indicies in the array, many many times
    for(let i = 0; i < 1000000; i++){
        let rand1 = Math.floor(Math.random() * 52);
        let rand2 = Math.floor(Math.random() * 52);
        //store this in temp
        let temp = this.cards[rand1];
        //put value of 2 in 1
        this.cards[rand1]=this.cards[rand2]
        // grab value of card 1 that we saved in temp
        this.cards[rand2]=temp;
    }
        }
}
export default Deck;