import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function CardList({ cards, onRemoveCard, groupIdx }) {
  let idx = 0
  idx++
  return (
    <Droppable
      droppableId={`${idx}`}>
      {(provided) => (
        <div className="card-list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {cards.map((card, index) => <CardPreview card={card} key={card.id} onRemoveCard={onRemoveCard} index={index} />)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}