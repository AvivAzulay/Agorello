import { CardPreview } from './CardPreview.jsx'

export function CardList({ cards, onRemoveCard }) {
  return (
    <div className="card-list">
      { cards.map(card => <CardPreview card={card} key={card.id} onRemoveCard={onRemoveCard} />)}
    </div>
  )
}