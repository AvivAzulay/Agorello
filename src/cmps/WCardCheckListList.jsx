import React from 'react'
import { CardCheckList } from './CardCheckList'


export function CardCheckListList(props) {
    if (!props.checklist || !props.checklist.length) return <React.Fragment />
    return (
        <div className="checklists-container">
            {props.checklist.map(list => <CardCheckList key={list.id} list={list} addActivity={props.addActivity} onUpdate={props.onUpdate} />)}
        </div>
    )
}
