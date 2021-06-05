import { httpService } from './http-service'
import { utilService } from './util-service'
import { socketService } from './socketService'

export const boardService = {
    query,
    getById,
    addBoard,
    updateBoard,
    setCurrBoard,
    // getCardTitleById,
    updateActivityList
    // saveGroup,
    // saveCard,
    // removeCard,
    // removeGroup,
    // getCardById,
    // updateBoard,
    // getGboards,
    // saveBoard
}

const gBoards = getGboards()
var gBoard;

async function setCurrBoard(boardId) {
    const board = await getById(boardId)
    gBoard = _deepCloneBoard(board)
}

async function query(filterBy) {
    const boards = await httpService.get('board', filterBy)
    return Promise.resolve(boards)
}

async function getById(boardId) {
    // if (board) updateBoards() //updates the boards array at every change by the current board
    const boards = await httpService.get('board')
    const board = boards.find(board => board._id === boardId)
    const newBoard = _deepCloneBoard(board)
    return newBoard
}

async function updateBoard(board) {
    socketService.emit('board updated', board)
    const boardId = board._id
    return await httpService.put(`board/${boardId}`, board)
}

// async function removeCard(cardId, groupId) {
//     let board = gBoard
//     const groupIdx = board.groups.findIndex(group => group.id === groupId)
//     const cardIdx = board.groups[groupIdx].cards.findIndex(card => card.id === cardId)
//     board.groups[groupIdx].cards.splice(cardIdx, 1)
//     const newBoard = _deepCloneBoard(board)
//     gBoard = _deepCloneBoard(newBoard)
//     const updatedBoard = await httpService.put(`board/${board._id}`, newBoard)
//     return updatedBoard
// }

// async function removeGroup(groupId) {
//     let board = gBoard
//     const groupIdx = board.groups.findIndex(group => group.id === groupId)
//     board.groups.splice(groupIdx, 1)
//     const newBoard = _deepCloneBoard(board)
//     gBoard = _deepCloneBoard(newBoard)
//     const updatedBoard = await httpService.put(`board/${board._id}`, newBoard)
//     return updatedBoard
// }

// function getBoardById(bordId) {
//     const board = gBoards.find(board => board._id === bordId)
//     return board
// }
// function updateBoards() {
//     const boardIdx = gBoards.findIndex(board => board._id === board.id)
//     gBoards[boardIdx] = board
// }

// function getBoardIdx(bord) {
//     const idx = gBoards.find(board => board._id === bordId)
//     return board
// }

// function removeBoard(boardId) {
//     return httpService.delete(`board/${boardId}`)
// }

// async function saveGroup(group, board) {
//     if (group.id) {
//         const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
//         board.groups[groupIdx] = group
//         const newBoard = _deepCloneBoard(board)
//         gBoard = _deepCloneBoard(newBoard)
//         const updatedBoard = await httpService.put(`board/${board._id}`, newBoard)
//         return updatedBoard
//     // return Promise.resolve(_deepCloneBoard(gBoard))
// }
// else {
//     group.cards = []
//     board.groups.push(group)
//     const newBoard = _deepCloneBoard(board)
//     gBoard = _deepCloneBoard(newBoard)
//     const updatedBoard = await httpService.put(`board/${board._id}`, newBoard)
//     return updatedBoard
// }
// }

// async function saveCard(card, groupId, board) {
//     console.log('save card', board)
//     if (card.id) {
//         // let board = gBoard
//         // let group = board.groups.find(group => group.id === groupId)
//         const groupIdx = board.groups.findIndex(group => group.id === groupId)
//         board.groups[groupIdx].cards.map(currCard => {
//             return (currCard.id === card.id) ? card : currCard
//         })
//         const newBoard = _deepCloneBoard(board)
//         gBoard = _deepCloneBoard(newBoard)
//         const updatedBoard = await httpService.put(`board/${board._id}`, newBoard)
//         return updatedBoard
//         // return Promise.resolve(_deepCloneBoard(gBoard))
//     } else {
//         let board = gBoard
//         console.log('save card', board)
//         const groupIdx = board.groups.findIndex(group => group.id === groupId)
//         card.currGroup = { groupId: board.groups[groupIdx].id, createdAt: new Date() }
//         card.id = utilService.makeId()
//         card.members = []
//         card.labels = []
//         card.attachments = []
//         card.members = []
//         card.checklist = []
//         board.groups[groupIdx].cards.push(card)
//         console.log(board.groups[groupIdx].cards)
//         const newBoard = _deepCloneBoard(board)
//         gBoard = _deepCloneBoard(newBoard)
//         const updatedBoard = await httpService.put(`board/${board._id}`, newBoard)
//         return updatedBoard
//         // return Promise.resolve(_deepCloneBoard(gBoard))
//     }
// }


// function getCardById(cardId, board) {
//     const group = board.groups.find(group => group.cards.find(card => card.id === cardId))
//     return group.cards.find(card => card.id === cardId)
// }

// function getCardTitleById(cardId) {
//     let board = gBoard
//     let cardTitle;
//     board.groups.forEach(group => group.cards.forEach(card => {
//         if (card.id === cardId) {
//             cardTitle = card.title
//         }
//     }))
//     return cardTitle
// }

// function updateBoard(board) {
//     board = board;
// }

function _deepCloneBoard(board) {
    return JSON.parse(JSON.stringify(board))
}

function _getGroupById(board, id) {
    // const group = board.groups.find(group => group.id === id)
    // console.log(group);
    return board.groups.find(group => group.id === id)
}

function updateActivityList(board, data, action) {
    const newBoard = _deepCloneBoard(board)
    let activity = {
        "id": utilService.makeId(),
        "txtCard": "",
        "txtBoard": "",
        "commentTxt": "",
        "createdAt": Date.now(),
        "byMember": {
            // Change it to current logged in user
            "_id": "5f6a2528973d861c5d78c355",
            "fullname": "Gad Refaeli",
            "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg`
        }
    }
    switch (action) {
        case 'ADD_CARD':
            let group1 = _getGroupById(newBoard, data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} added this card to ${group1.title}`
            activity.txtBoard = `${activity.byMember.fullname} added ${data.title} to ${group1.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // console.log('activity', activity);
            // activity.byMember = currLoggedInMember\
            break;
        case 'ADD_MEMBER':
            let group2 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} added ${data.addedMember.fullname} to this card`
            activity.txtBoard = `${activity.byMember.fullname} added ${data.addedMember.fullname} to ${group2.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'REMOVE_MEMBER':
            let group3 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} added ${data.removedMember.fullname} to this card`
            activity.txtBoard = `${activity.byMember.fullname} added ${data.removedMember.fullname} to ${group3.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'ADD_CHECKLIST':
            let group4 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} added ${data.currList.title} to this card`
            activity.txtBoard = `${activity.byMember.fullname} added ${data.currList.title} to ${group4.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'REMOVE_CHECKLIST':
            let group5 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} removed ${data.currList.title} from this card`
            activity.txtBoard = `${activity.byMember.fullname} removed ${data.currList.title} from ${group5.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
            break
        case 'ADD_GROUP':
            activity.txtBoard = `${activity.byMember.fullname} added ${data.title} to this board`
            break
        case 'REMOVE_GROUP':
            activity.txtBoard = `${activity.byMember.fullname} archived list ${data.title}`
            break
        case 'COMPLETE_TASK':
            let group6 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} completed ${data.txtValue} on this card`
            activity.txtBoard = `${activity.byMember.fullname} completed ${data.txtValue} on ${group6.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        case 'INCOMPLETE_TASK':
            let group7 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} marked ${data.txtValue} incomplete on this card`
            activity.txtBoard = `${activity.byMember.fullname} marked ${data.txtValue} incomplete on ${group7.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        case 'COMPLETE_DUEDATE':
            let group8 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} marked the due date complete`
            activity.txtBoard = `${activity.byMember.fullname} marked the due date on ${group8.title} complete`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        case 'INCOMPLETE_DUEDATE':
            let group9 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} marked the due date incomplete`
            activity.txtBoard = `${activity.byMember.fullname} marked the due date on ${group9.title} incomplete`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        default:
            break;
    }
    newBoard.activities.unshift(activity)
    return Promise.resolve(newBoard)
}

async function addBoard(title, backgroundURL, board) {
    let newBoard;
    if (board) { //template duplication

        newBoard = _deepCloneBoard(board)
        newBoard.isTemplate = false
    } else {
        newBoard = {
            // "_id": utilService.makeId(12),
            "title": title,
            "isArchived": false,
            "isTemplate": false,
            "labels": [
                {
                    "id": "l101",
                    "name": "Teamwork",
                    "color": "green"
                },
                {
                    "id": "l102",
                    "name": "Urgent",
                    "color": "yellow"
                },
                {
                    "id": "l103",
                    "name": "Pay attention",
                    "color": "orange"
                },
                {
                    "id": "l104",
                    "name": "Important",
                    "color": "red"
                },
                {
                    "id": "l105",
                    "name": "Default",
                    "color": "purple"
                },
                {
                    "id": "l106",
                    "name": "Default",
                    "color": "blue"
                }
            ],
            "activities": [],
            "createdBy": {
                // "_id": "5f6a2532173d861c5d78c332",
                "fullname": "mike awsome",
                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
            },
            "style": {
                "id": utilService.makeId(),
                "fontClr": "#f9f9f9",
                "bgImg": backgroundURL
            },
            "members": [
                {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "Puki Ben David",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "Mike Awsome",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                {
                    "_id": "5f6a2532173d861c5d78c321",
                    "fullname": "Tuki Taka",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                }
            ],
            "groups": [{
                "id": utilService.makeId(),
                "title": "My new group!",
                "archivedAt": false,
                "cards": []
            }]

        }
    }

    console.log('add', newBoard)
    newBoard = await httpService.post('board', newBoard)
    gBoards.push(newBoard)
    return Promise.resolve((_deepCloneBoard(newBoard)))
}
