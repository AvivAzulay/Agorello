import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function CardList({ onRemoveCard, group }) {
  return (
    <Droppable droppableId={group.id} type="card">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="card-container">
            {group.cards.map((card, index) => {
              return <CardPreview
                key={card.id}
                card={card}
                index={index}
                onRemoveCard={onRemoveCard}
              />
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}