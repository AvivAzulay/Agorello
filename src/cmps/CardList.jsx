import { CardPreview } from './CardPreview.jsx'

export function CardList({ cards }) {
  console.log(cards)
  return (
    <a className="aa">
      { cards.map(card => <CardPreview card={card} key={card.id} />)}
    </a>
  )
}