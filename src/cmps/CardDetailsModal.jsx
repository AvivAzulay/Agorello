import { CardMemberList } from './CardMemberList'
import { CardLabelList } from './CardLabelList'
import { CardAddCheckList } from './CardAddCheckList'
import { CardDateSetter } from './CardDateSetter'

export function CardDetailsModal({ modalType, modalLoc, card, onToggleModal, saveActivity,
    onUpdateCardProps, boardMembers, boardLabels}) { 
    const DynamicCmp = (props) => {
        switch (modalType) {
           case 'members':
                return <CardMemberList {...props} />
            case 'labels':
                return <CardLabelList {...props} />
            case 'checklist':
                return <CardAddCheckList {...props} />
            case 'date':
                return <CardDateSetter {...props} />
        }
    }
    return (
        <DynamicCmp card={card} onToggle={onToggleModal} saveActivity={saveActivity}
        onUpdateCardProps={onUpdateCardProps} boardMembers={boardMembers}
        boardLabels={boardLabels} modalLoc={modalLoc}/>
    )
}