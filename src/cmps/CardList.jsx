import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function CardList({ onRemoveCard, group,getActivitiesByCardId ,onOpenPreviewLabels ,isLebelOpen}) {
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
                onOpenPreviewLabels={onOpenPreviewLabels}
                 isLebelOpen={isLebelOpen}
              />
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}