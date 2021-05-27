import { CardPreview } from './CardPreview.jsx'

export function CardList({ cards }) {
  return (
    <a className="aa">
      { cards.map(card => <CardPreview card={card} key={card.id} />)}
    </a>
  )
}