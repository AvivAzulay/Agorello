import { CardMemberList } from './CardMemberList'
import { CardLabelList } from './CardLabelList'
import { CardAddCheckList } from './CardAddCheckList'
import { CardCoverList } from './CardCoverList'

export function CardDetailsModal({ modalType, board, modalLoc, card, onToggleModal, saveActivity,
    onUpdateCardProps, boardMembers, boardLabels }) {
    const DynamicCmp = (props) => {
        switch (modalType) {
            case 'members':
                return <CardMemberList {...props} />
            case 'labels':
                return <CardLabelList {...props} />
            case 'checklist':
                return <CardAddCheckList {...props} />
            case 'cover':
                return <CardCoverList {...props} />
            default:
                break
        }

    }
    return (
        <DynamicCmp
            card={card}
            board={board}
            modalLoc={modalLoc}
            onToggle={onToggleModal}
            boardLabels={boardLabels}
            saveActivity={saveActivity}
            boardMembers={boardMembers}
            onUpdateCardProps={onUpdateCardProps}
        />
    )
}