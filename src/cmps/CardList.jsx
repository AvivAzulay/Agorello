import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function CardList({ cards, onRemoveCard, group }) {
  return (

    <Droppable droppableId={group.id} type="card">
      {(provided) => (
        <div className="card-container"
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {group.cards.map((card, index) => {
            if (!card.archivedAt) {
              return <CardPreview
                key={card.id}
                card={card}
                index={index}
                onRemoveCard={onRemoveCard}
              />
            }
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>

  )
}

// <Droppable
//       droppableId={group.id}>
//       {(provided) => (
//         <div className="card-list"
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//         >
//           {cards.map((card, index) => <CardPreview card={card} key={card.id} onRemoveCard={onRemoveCard} index={index} />)}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>