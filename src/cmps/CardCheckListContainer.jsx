import React from 'react'
import { CardCheckList } from './CardCheckList'


export function CardCheckListContainer({ checklist, addActivity, onUpdateCardProps }) {
    if (!checklist || !checklist.length) return <></>
    return (
        <div className="checklists-container">
            {checklist.map(list => <CardCheckList key={list.id} checklist={checklist} list={list} addActivity={addActivity} onUpdateCardProps={onUpdateCardProps} />)}
        </div>
    )
}
