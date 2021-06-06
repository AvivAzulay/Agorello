import { httpService } from './http-service'
import { utilService } from './util-service'
import { socketService } from './socketService'

export const boardService = {
    query,
    getById,
    addBoard,
    updateBoard,
    // setCurrBoard,
    updateActivityList
}

<<<<<<< HEAD
// const gBoards = getGboards()
var gBoard;

async function setCurrBoard(boardId) {
    const board = await getById(boardId)
    gBoard = _deepCloneBoard(board)
}
=======
// async function setCurrBoard(boardId) {
//     const board = await getById(boardId)
// }
>>>>>>> 6c8087e86adfef8ed5d58e694138916361bb983b

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
    const result = await httpService.put(`board/${board._id}`, board)
    socketService.emit('board update', board)
    return result
}

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
            "fullname": "puki ben david",
            "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
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
<<<<<<< HEAD
    // gBoards.push(newBoard)
=======
>>>>>>> 6c8087e86adfef8ed5d58e694138916361bb983b
    return Promise.resolve((_deepCloneBoard(newBoard)))
}



