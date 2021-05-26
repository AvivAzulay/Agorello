import { CardPreview } from './CardPreview.jsx'

export function CardList({ cards }) {
  return (
    <div className="group-list">
      { cards.map(card => <CardPreview card={card} key={card.id} />)}
    </div>
  )
}