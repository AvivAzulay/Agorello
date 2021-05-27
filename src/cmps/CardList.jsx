import { CardPreview } from './CardPreview.jsx'

<<<<<<< HEAD
export function CardList({ cards }) {
  console.log(cards)
=======
export function CardList({ cards, onRemoveCard }) {
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
  return (
    <div className="card-list">
      { cards.map(card => <CardPreview card={card} key={card.id} onRemoveCard={onRemoveCard} />)}
    </div>
  )
}