import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function CardList({ onRemoveCard, group,getActivitiesByCardId }) {
  return (
    <Droppable droppableId={group.id} type="card">
      {provided => (
        <div
          className="card-list-inner"
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
                getActivitiesByCardId={getActivitiesByCardId}
              />
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}