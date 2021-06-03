import { utilService } from './util-service'

export const boardService = {
    query,
    saveGroup,
    saveCard,
    removeCard,
    removeGroup,
    getCardById,
    getCardTitleById,
    updateBoard,
    getGboards,
    addBoard,
    updateActivityList,
    saveBoard
}

let gBoards = getGboards()
let gBoard;

function query(bordId) {
    if (gBoard) updateBoards() //updates the boards array at every change by the current board
    gBoard = getBoardById(bordId)
   console.log(gBoard)
    return Promise.resolve(gBoard)
}

function getBoardById(bordId) {
    const board = gBoards.find(board => board._id === bordId)
    return board
}

function updateBoards() {
    const boardIdx = gBoards.findIndex(board => board._id === gBoard.id)
    gBoard[boardIdx] = gBoard
}

// function getBoardIdx(bord) {
//     const idx = gBoards.find(board => board._id === bordId)
//     return board
// }

function saveBoard(board) {
    gBoard = board
    return Promise.resolve(_deepCloneBoard(board))
}

function saveGroup(group) {
    if (group.id) {
        const groupIdx = gBoard.groups.findIndex(currGroup => currGroup.id === group.id)
        gBoard.groups[groupIdx] = group
        return Promise.resolve(_deepCloneBoard(gBoard))
    }
    else {
        group.id = utilService.makeId()
        group.cards = []
        gBoard.groups.push(group)
        return Promise.resolve(_deepCloneBoard(gBoard))
    }
}

function saveCard(card, groupId) {
    if (card.id) {
        const group = gBoard.groups.find(group => group.id === groupId)
        const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
        gBoard.groups[groupIdx] = group
        return Promise.resolve(_deepCloneBoard(gBoard))
    }
    else {
        card.id = utilService.makeId()
        const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
        card.currGroup = { groupId: gBoard.groups[groupIdx].id, createdAt: new Date() }
        card.members = []
        card.labels = []
        card.attachments = []
        card.members = []
        card.checklist = []
        gBoard.groups[groupIdx].cards.push(card)
        return Promise.resolve(_deepCloneBoard(gBoard))
    }
}

function removeCard(cardId, groupId) {
    const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
    const cardIdx = gBoard.groups[groupIdx].cards.findIndex(card => card.id === cardId)
    gBoard.groups[groupIdx].cards.splice(cardIdx, 1)
    return Promise.resolve(_deepCloneBoard(gBoard))
}

function removeGroup(groupId) {
    const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
    gBoard.groups.splice(groupIdx, 1)
    return Promise.resolve(_deepCloneBoard(gBoard))
}

function getCardById(cardId) {
    const group = gBoard.groups.find(group => group.cards.find(card => card.id === cardId))
    return group.cards.find(card => card.id === cardId)
}

function getCardTitleById(cardId, board) {
    let cardTitle;
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.id === cardId) {
            cardTitle = card.title
        }
    }))
    return cardTitle
}

function updateBoard(board) {
    gBoard = board;

}

function _deepCloneBoard(board) {
    return JSON.parse(JSON.stringify(board))
}

function _getGroupById(id) {
    return gBoard.groups.find(group => group.id === id)
}

function updateActivityList(data, action) {
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
            let group1 = _getGroupById(data.currGroup.groupId)
            activity.txtCard = `${activity.byMember.fullname} added this card to ${group1.title}`
            activity.txtBoard = `${activity.byMember.fullname} added ${data.title} to ${group1.title}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            // activity.byMember = currLoggedInMember
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
        case 'ADD_COMMENT':
            let group10 = _getGroupById(data.currGroup.groupId)
            activity.commentTxt = `${activity.byMember.fullname} commented\n ${data.commentTxt}`
            activity.txtBoard = `${activity.byMember.fullname} on ${group10.title}\n ${data.commentTxt}`
            activity.card = {
                "id": data.id,
                "title": data.title,
            }
            break
        default:
            break;
    }

    gBoard.activities.unshift(activity)
    return Promise.resolve(_deepCloneBoard(gBoard))
}

/* <h3 contentEditable>Description</h3> */

function addBoard(title, backgroundURL, board) {
    let newBoard;
    if (board) { //template duplication
        newBoard = _deepCloneBoard(board);
        newBoard._id = utilService.makeId(24);
        newBoard.isTemplate = false;
    }
    else {
        newBoard = {
            "_id": utilService.makeId(24),
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
                "_id": "5f6a2532173d861c5d78c332",
                "fullname": "mike awsome",
                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
            },
            "style": {
                "id": "LD2D5",
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
            "groups": []
        }
    }
    gBoards.push(newBoard)
    return Promise.resolve((_deepCloneBoard(newBoard)))
}

function getGboards() {
    return [
        {
            "_id": "GZkw1yt2w6hrQ2C2diPiQmIy",
            "title": "sprint 4",
            "isArchived": false,
            "isTemplate": true,
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
            "activities": [
                {
                    "id": "57RKox",
                    "txtCard": "Gad Refaeli marked the due date complete",
                    "txtBoard": "Gad Refaeli marked the due date on Done complete",
                    "commentTxt": "",
                    "createdAt": 1622720486374,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "oCSF9e",
                        "title": "login with facebook"
                    }
                },
                {
                    "id": "PXZvna",
                    "txtCard": "",
                    "txtBoard": "Gad Refaeli added Done to this board",
                    "commentTxt": "",
                    "createdAt": 1622718983765,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    }
                },
                {
                    "id": "wlgMNc",
                    "txtCard": "Gad Refaeli added this card to QA",
                    "txtBoard": "Gad Refaeli added Test algorithm to QA",
                    "commentTxt": "",
                    "createdAt": 1622718238812,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "KPdoD9",
                        "title": "Test algorithm"
                    }
                },
                {
                    "id": "XVchG7",
                    "txtCard": "Gad Refaeli added Gad Refaeli to this card",
                    "txtBoard": "Gad Refaeli added Gad Refaeli to Design",
                    "commentTxt": "",
                    "createdAt": 1622717915952,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "MsQM6R",
                        "title": "status"
                    }
                },
                {
                    "id": "8pMcad",
                    "txtCard": "Gad Refaeli added Oded Alon to this card",
                    "txtBoard": "Gad Refaeli added Oded Alon to Design",
                    "commentTxt": "",
                    "createdAt": 1622717915322,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "MsQM6R",
                        "title": "status"
                    }
                },
                {
                    "id": "mvHVyc",
                    "txtCard": "Gad Refaeli added Aviv Azulay to this card",
                    "txtBoard": "Gad Refaeli added Aviv Azulay to Design",
                    "commentTxt": "",
                    "createdAt": 1622717914628,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "MsQM6R",
                        "title": "status"
                    }
                },
                {
                    "id": "v4P02Y",
                    "txtCard": "Gad Refaeli added Gad Refaeli to this card",
                    "txtBoard": "Gad Refaeli added Gad Refaeli to Dev",
                    "commentTxt": "",
                    "createdAt": 1622717902336,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "1Z628a",
                        "title": "Create logo for tasKit"
                    }
                },
                {
                    "id": "Byksis",
                    "txtCard": "Gad Refaeli added Matan Crispel to this card",
                    "txtBoard": "Gad Refaeli added Matan Crispel to QA",
                    "commentTxt": "",
                    "createdAt": 1622717889731,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "hPBwWg",
                        "title": "BUG with backend!!"
                    }
                },
                {
                    "id": "HnfWey",
                    "txtCard": "Gad Refaeli added Gad Refaeli to this card",
                    "txtBoard": "Gad Refaeli added Gad Refaeli to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622717881046,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "FLQ3sL",
                        "title": "login with google"
                    }
                },
                {
                    "id": "OWgKuw",
                    "txtCard": "Gad Refaeli added Gad Refaeli to this card",
                    "txtBoard": "Gad Refaeli added Gad Refaeli to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622717876284,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "oCSF9e",
                        "title": "login with facebook"
                    }
                },
                {
                    "id": "uIEyP7",
                    "txtCard": "Gad Refaeli added Aviv Azulay to this card",
                    "txtBoard": "Gad Refaeli added Aviv Azulay to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622717868038,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "cJpDN0",
                        "title": "Dashboard analysis"
                    }
                },
                {
                    "id": "apZ0FF",
                    "txtCard": "Gad Refaeli added Gad Refaeli to this card",
                    "txtBoard": "Gad Refaeli added Gad Refaeli to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622717860924,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "xQLgzQ",
                        "title": "Login sign up "
                    }
                },
                {
                    "id": "QnBwrq",
                    "txtCard": "Gad Refaeli added Gad Refaeli to this card",
                    "txtBoard": "Gad Refaeli added Gad Refaeli to Dev",
                    "commentTxt": "",
                    "createdAt": 1622717845216,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "TBVr7u",
                        "title": "Wire up backend!"
                    }
                },
                {
                    "id": "y8j016",
                    "txtCard": "Gad Refaeli added Oded Alon to this card",
                    "txtBoard": "Gad Refaeli added Oded Alon to Dev",
                    "commentTxt": "",
                    "createdAt": 1622717843991,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "TBVr7u",
                        "title": "Wire up backend!"
                    }
                },
                {
                    "id": "t7yQ3H",
                    "txtCard": "Gad Refaeli added Gad Refaeli to this card",
                    "txtBoard": "Gad Refaeli added Gad Refaeli to Dev",
                    "commentTxt": "",
                    "createdAt": 1622717841698,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "TBVr7u",
                        "title": "Wire up backend!"
                    }
                },
                {
                    "id": "DECQpV",
                    "txtCard": "Gad Refaeli added this card to Dev",
                    "txtBoard": "Gad Refaeli added Wire up backend! to Dev",
                    "commentTxt": "",
                    "createdAt": 1622717806453,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "TBVr7u",
                        "title": "Wire up backend!"
                    }
                },
                {
                    "id": "hZOh7n",
                    "txtCard": "Gad Refaeli added this card to Cmps",
                    "txtBoard": "Gad Refaeli added Login sign up  to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622717785407,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "xQLgzQ",
                        "title": "Login sign up "
                    }
                },
                {
                    "id": "41n0Kk",
                    "txtCard": "Gad Refaeli added this card to Cmps",
                    "txtBoard": "Gad Refaeli added Dashboard analysis to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622717777789,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "cJpDN0",
                        "title": "Dashboard analysis"
                    }
                },
                {
                    "id": "12sAR7",
                    "txtCard": "Gad Refaeli added Logo design to this card",
                    "txtBoard": "Gad Refaeli added Logo design to Design",
                    "commentTxt": "",
                    "createdAt": 1622717646135,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "1Z628a",
                        "title": "Create logo for tasKit"
                    }
                },
                {
                    "id": "YyER7I",
                    "txtCard": "Gad Refaeli added this card to Design",
                    "txtBoard": "Gad Refaeli added Create logo for tasKit to Design",
                    "commentTxt": "",
                    "createdAt": 1622717633731,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "1Z628a",
                        "title": "Create logo for tasKit"
                    }
                },
                {
                    "id": "5auXZK",
                    "txtCard": "Gad Refaeli added this card to QA",
                    "txtBoard": "Gad Refaeli added BUG with backend!! to QA",
                    "commentTxt": "",
                    "createdAt": 1622716378522,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "hPBwWg",
                        "title": "BUG with backend!!"
                    }
                },
                {
                    "id": "9oAwew",
                    "txtCard": "",
                    "txtBoard": "Gad Refaeli added QA to this board",
                    "commentTxt": "",
                    "createdAt": 1622716356548,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    }
                },
                {
                    "id": "afqhqe",
                    "txtCard": "Gad Refaeli added this card to Dev",
                    "txtBoard": "Gad Refaeli added get option design from designer to Dev",
                    "commentTxt": "",
                    "createdAt": 1622716251831,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "p6fd7r",
                        "title": "get option design from designer"
                    }
                },
                {
                    "id": "dsjsOC",
                    "txtCard": "Gad Refaeli added this card to Dev",
                    "txtBoard": "Gad Refaeli added status to Dev",
                    "commentTxt": "",
                    "createdAt": 1622714981503,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "MsQM6R",
                        "title": "status"
                    }
                },
                {
                    "id": "jhWgy3",
                    "txtCard": "Gad Refaeli marked Home page incomplete on this card",
                    "txtBoard": "Gad Refaeli marked Home page incomplete on Dev",
                    "commentTxt": "",
                    "createdAt": 1622714234120,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "B4ntWs",
                        "title": "responsive design"
                    }
                },
                {
                    "id": "DFRIST",
                    "txtCard": "Gad Refaeli completed Home page on this card",
                    "txtBoard": "Gad Refaeli completed Home page on Dev",
                    "commentTxt": "",
                    "createdAt": 1622714232897,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "B4ntWs",
                        "title": "responsive design"
                    }
                },
                {
                    "id": "CSgUVT",
                    "txtCard": "Gad Refaeli added responsive work to this card",
                    "txtBoard": "Gad Refaeli added responsive work to Dev",
                    "commentTxt": "",
                    "createdAt": 1622713665016,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "B4ntWs",
                        "title": "responsive design"
                    }
                },
                {
                    "id": "vU0hAe",
                    "txtCard": "Gad Refaeli added this card to Dev",
                    "txtBoard": "Gad Refaeli added responsive design to Dev",
                    "commentTxt": "",
                    "createdAt": 1622713638661,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "B4ntWs",
                        "title": "responsive design"
                    }
                },
                {
                    "id": "y4VE49",
                    "txtCard": "Gad Refaeli added this card to Cmps",
                    "txtBoard": "Gad Refaeli added login with facebook to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622713556990,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "oCSF9e",
                        "title": "login with facebook"
                    }
                },
                {
                    "id": "Ln7kLt",
                    "txtCard": "Gad Refaeli added this card to Cmps",
                    "txtBoard": "Gad Refaeli added login with google to Cmps",
                    "commentTxt": "",
                    "createdAt": 1622713486085,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "FLQ3sL",
                        "title": "login with google"
                    }
                },
                {
                    "id": "RyBfT4",
                    "txtCard": "",
                    "txtBoard": "Gad Refaeli archived list dfsdfsd",
                    "commentTxt": "",
                    "createdAt": 1622713448209,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    }
                },
                {
                    "id": "xxGQrn",
                    "txtCard": "Gad Refaeli marked the due date complete",
                    "txtBoard": "Gad Refaeli marked the due date on Dev complete",
                    "commentTxt": "",
                    "createdAt": 1622712963745,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "5KK3V",
                        "title": "EditCard.jsx"
                    }
                },
                {
                    "id": "dmXqLn",
                    "txtCard": "",
                    "txtBoard": "Gad Refaeli on Dev\n gfdgfdg",
                    "commentTxt": "Gad Refaeli commented\n gfdgfdg",
                    "createdAt": 1622712955180,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "5KK3V",
                        "title": "EditCard.jsx"
                    }
                },
                {
                    "id": "BtrbkS",
                    "txtCard": "Gad Refaeli added Oded Alon to this card",
                    "txtBoard": "Gad Refaeli added Oded Alon to Dev",
                    "commentTxt": "",
                    "createdAt": 1622712948271,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    },
                    "card": {
                        "id": "5KK3V",
                        "title": "EditCard.jsx"
                    }
                },
                {
                    "id": "oheey3",
                    "txtCard": "",
                    "txtBoard": "Gad Refaeli added dfsdfsd to this board",
                    "commentTxt": "",
                    "createdAt": 1622712904041,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Gad Refaeli",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                    }
                },
                {
                    "id": "nsH78L",
                    "txtCard": "Oded Alon added this card to Dev",
                    "txtBoard": "Oded Alon added Full Backend to Dev",
                    "commentTxt": "",
                    "createdAt": 1622641729814,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Oded Alon",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg"
                    },
                    "card": {
                        "id": "YCAURs",
                        "title": "Full Backend"
                    }
                },
                {
                    "id": "BEOzOa",
                    "txtCard": "Aviv Azulay marked the due date complete",
                    "txtBoard": "Aviv Azulay marked the due date on Cmps complete",
                    "commentTxt": "",
                    "createdAt": 1622641649424,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Aviv Azulay",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg"
                    },
                    "card": {
                        "id": "7K2SD",
                        "title": "Activities.jsx"
                    }
                }
            ],
            "createdBy": {
                "_id": "5f6a2532173d861c5d78c332",
                "fullname": "mike awsome",
                "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
            },
            "style": {
                "id": "LD2D5",
                "fontClr": "#f9f9f9",
                "bgImg": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319332/background%20for%20Taskit/background_20_quuo0j.jpg"
            },
            "members": [
                {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "Oded Alon",
                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg"
                },
                {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "Aviv Azulay",
                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg"
                },
                {
                    "_id": "5f6a2532173d861c5d78c321",
                    "fullname": "Gad Refaeli",
                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                },
                {
                    "_id": "5f6a2532173d861c5d78c320",
                    "fullname": "Matan Crispel",
                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg"
                }
            ],
            "groups": [
                {
                    "id": "K2D5f",
                    "title": "Design",
                    "archivedAt": false,
                    "cards": [
                        {
                            "title": "responsive design",
                            "id": "B4ntWs",
                            "currGroup": {
                                "groupId": "K2D5f",
                                "createdAt": "2021-06-03T09:47:18.661Z"
                            },
                            "members": [],
                            "labels": [
                                {
                                    "id": "l103",
                                    "name": "Pay attention",
                                    "color": "orange"
                                },
                                {
                                    "id": "l101",
                                    "name": "Teamwork",
                                    "color": "green"
                                }
                            ],
                            "attachments": [],
                            "checklist": [
                                {
                                    "id": "0TNlSp",
                                    "title": "responsive work",
                                    "todos": [
                                        {
                                            "id": "GdNO0s",
                                            "isDone": false,
                                            "title": "Home page"
                                        },
                                        {
                                            "id": "DyXFVP",
                                            "isDone": false,
                                            "title": "Menu"
                                        }
                                    ]
                                }
                            ],
                            "dueDate": {
                                "time": "2021-06-18T14:42",
                                "isCompleted": false
                            }
                        },
                        {
                            "title": "status",
                            "id": "MsQM6R",
                            "currGroup": {
                                "groupId": "K2D5f",
                                "createdAt": "2021-06-03T10:09:41.503Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d78c332",
                                    "fullname": "Aviv Azulay",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg"
                                },
                                {
                                    "_id": "5f6a2528973d861c5d78c355",
                                    "fullname": "Oded Alon",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg"
                                },
                                {
                                    "_id": "5f6a2532173d861c5d78c321",
                                    "fullname": "Gad Refaeli",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                                }
                            ],
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
                                }
                            ],
                            "attachments": [
                                "https://res.cloudinary.com/taskit-sprint/image/upload/v1622714999/fddzjasuftc1bfo4i4qj.jpg"
                            ],
                            "checklist": []
                        }
                    ]
                },
                {
                    "id": "5H6D9",
                    "title": "Cmps",
                    "archivedAt": false,
                    "cards": [
                        {
                            "title": "login with google",
                            "id": "FLQ3sL",
                            "currGroup": {
                                "groupId": "5H6D9",
                                "createdAt": "2021-06-03T09:44:46.085Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d78c321",
                                    "fullname": "Gad Refaeli",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                                }
                            ],
                            "labels": [
                                {
                                    "id": "l104",
                                    "name": "Important",
                                    "color": "red"
                                }
                            ],
                            "attachments": [],
                            "checklist": [],
                            "description": "for programer"
                        },
                        {
                            "title": "Dashboard analysis",
                            "id": "cJpDN0",
                            "currGroup": {
                                "groupId": "5H6D9",
                                "createdAt": "2021-06-03T10:56:17.787Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d78c332",
                                    "fullname": "Aviv Azulay",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg"
                                }
                            ],
                            "labels": [
                                {
                                    "id": "l103",
                                    "name": "Pay attention",
                                    "color": "orange"
                                }
                            ],
                            "attachments": [],
                            "checklist": [],
                            "dueDate": {
                                "time": "2021-06-04T14:42",
                                "isCompleted": false
                            }
                        },
                        {
                            "title": "Login sign up ",
                            "id": "xQLgzQ",
                            "currGroup": {
                                "groupId": "5H6D9",
                                "createdAt": "2021-06-03T10:56:25.405Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d78c321",
                                    "fullname": "Gad Refaeli",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                                }
                            ],
                            "labels": [
                                {
                                    "id": "l103",
                                    "name": "Pay attention",
                                    "color": "orange"
                                }
                            ],
                            "attachments": [],
                            "checklist": []
                        }
                    ]
                },
                {
                    "id": "2D5FR",
                    "title": "Dev",
                    "archivedAt": false,
                    "cards": [
                        {
                            "title": "get option design from designer",
                            "id": "p6fd7r",
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": "2021-06-03T10:30:51.830Z"
                            },
                            "members": [],
                            "labels": [
                                {
                                    "id": "l104",
                                    "name": "Important",
                                    "color": "red"
                                }
                            ],
                            "attachments": [],
                            "checklist": []
                        },
                        {
                            "title": "Create logo for tasKit",
                            "id": "1Z628a",
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": "2021-06-03T10:53:53.730Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d78c321",
                                    "fullname": "Gad Refaeli",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                                }
                            ],
                            "labels": [
                                {
                                    "id": "l102",
                                    "name": "Urgent",
                                    "color": "yellow"
                                },
                                {
                                    "id": "l104",
                                    "name": "Important",
                                    "color": "red"
                                }
                            ],
                            "attachments": [],
                            "checklist": [
                                {
                                    "id": "N07wP9",
                                    "title": "Logo design",
                                    "todos": [
                                        {
                                            "id": "tFTZCk",
                                            "isDone": false,
                                            "title": "Choose design"
                                        },
                                        {
                                            "id": "QOC7C5",
                                            "isDone": false,
                                            "title": "Create Logo"
                                        },
                                        {
                                            "id": "GYNzW5",
                                            "isDone": false,
                                            "title": "Upload logo for Q.A"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Wire up backend!",
                            "id": "TBVr7u",
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": "2021-06-03T10:56:46.451Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2528973d861c5d78c355",
                                    "fullname": "Oded Alon",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg"
                                }
                            ],
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
                                }
                            ],
                            "attachments": [
                                "https://res.cloudinary.com/taskit-sprint/image/upload/v1622718148/rfwgjzl9vh0ht61a0tyc.jpg"
                            ],
                            "checklist": [],
                            "description": "Sockets and everything else should be wroking today\n",
                            "dueDate": {
                                "time": "2021-06-15T14:42",
                                "isCompleted": false
                            }
                        }
                    ]
                },
                {
                    "title": "QA",
                    "id": "7wekNZ",
                    "cards": [
                        {
                            "title": "BUG with backend!!",
                            "id": "hPBwWg",
                            "currGroup": {
                                "groupId": "7wekNZ",
                                "createdAt": "2021-06-03T10:32:58.521Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d78c320",
                                    "fullname": "Matan Crispel",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg"
                                }
                            ],
                            "labels": [
                                {
                                    "id": "l104",
                                    "name": "Important",
                                    "color": "red"
                                }
                            ],
                            "attachments": [],
                            "checklist": [],
                            "dueDate": {
                                "time": "2021-06-22T14:41",
                                "isCompleted": false
                            }
                        },
                        {
                            "title": "Test algorithm",
                            "id": "KPdoD9",
                            "currGroup": {
                                "groupId": "7wekNZ",
                                "createdAt": "2021-06-03T11:03:58.810Z"
                            },
                            "members": [],
                            "labels": [
                                {
                                    "id": "l101",
                                    "name": "Teamwork",
                                    "color": "green"
                                },
                                {
                                    "id": "l104",
                                    "name": "Important",
                                    "color": "red"
                                }
                            ],
                            "attachments": [
                                "https://res.cloudinary.com/taskit-sprint/image/upload/v1622718282/fmu8hstm9io0s62onob1.jpg"
                            ],
                            "checklist": [],
                            "dueDate": {
                                "time": "2021-06-04T14:42",
                                "isCompleted": false
                            }
                        }
                    ]
                },
                {
                    "title": "Done",
                    "id": "5Xz6Ud",
                    "cards": [
                        {
                            "title": "login with facebook",
                            "id": "oCSF9e",
                            "currGroup": {
                                "groupId": "5Xz6Ud",
                                "createdAt": "2021-06-03T09:45:56.989Z"
                            },
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d78c321",
                                    "fullname": "Gad Refaeli",
                                    "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg"
                                }
                            ],
                            "labels": [
                                {
                                    "id": "l103",
                                    "name": "Pay attention",
                                    "color": "orange"
                                }
                            ],
                            "attachments": [],
                            "checklist": [],
                            "dueDate": {
                                "time": "2021-06-01T14:41",
                                "isCompleted": true
                            }
                        }
                    ]
                }
            ]
        },
        {
            "_id": "5f72ea5a1ab1fc0017450368",
            "title": "Hello !!!",
            "isArchived": false,
            "isTemplate": true,
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
            "activities": [
                // {
                //     "id": "2DVJ3",
                //     "txt": "moved the card",
                //     "commentTxt": "",
                //     "createdAt": 1601367036803,
                //     "byMember": {
                //         "_id": "5f6a2528973d861c5d78c355",
                //         "fullname": "puki ben david",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {
                //         "id": "2L8J2",
                //         "title": "Signup"
                //     },
                //     "group": {}
                // },
                // {
                //     "id": "2LD34",
                //     "txt": "moved the group",
                //     "commentTxt": "",
                //     "createdAt": 1601367032102,
                //     "byMember": {
                //         "_id": "5f6a2528973d861c5d78c355",
                //         "fullname": "puki ben david",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {},
                //     "group": {
                //         "id": "2L4G4",
                //         "title": "QA"
                //     }
                // },
                // {
                //     "id": "2LG8E",
                //     "txt": "",
                //     "commentTxt": "deleted card content",
                //     "createdAt": 1601366968534,
                //     "byMember": {
                //         "_id": "5f6a2532173d861c5d78c332",
                //         "fullname": "mike awsome",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {
                //         "id": "5KK3V",
                //         "title": "Shaving cream"
                //     },
                //     "group": {}
                // },
                // {
                //     "id": "2D6J2",
                //     "txt": "edited the group",
                //     "commentTxt": "",
                //     "createdAt": 1601367016951,
                //     "byMember": {
                //         "_id": "5f6a2532173d861c5d78c332",
                //         "fullname": "mike awsome",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {},
                //     "group": {
                //         "id": "2KE43",
                //         "title": "Development"
                //     }
                // }
            ],
            "createdBy": {
                "_id": "5f6a2532173d861c5d78c332",
                "fullname": "mike awsome",
                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
            },
            "style": {
                "id": "LD2D5",
                "fontClr": "#f9f9f9",
                "bgImg": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319332/background%20for%20Taskit/background_20_quuo0j.jpg"
            },
            "members": [
                {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "Oded Alon",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "Aviv Azulay",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c321",
                    "fullname": "Gad Refaeli",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c320",
                    "fullname": "Matan Crispel",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg`
                }
            ],
            "groups": [
                {
                    "id": "5H6D9",
                    "title": "Cmps",
                    "archivedAt": false,
                    "cards": [
                        {
                            "id": "5K24K",
                            "title": "EdidCard.jsx",
                            "description": "",
                            "checklist": [],
                            "archivedAt": null,
                            "members": [],
                            "labels": [
                                {
                                    "id": "l101"
                                }
                            ],
                            "createdAt": 1601366751048,

                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },
                            "attachments": [],

                            //                     "currGroup": {
                            //                         "groupId": "5H6D9",
                            //                         "createdAt": 1601366751048
                            //                     },
                            //                     "byMember": {
                            //                         "_id": "5f6a2532173d861c5d78c321",
                            //                         "fullname": "tuki taka",
                            //                         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                            //                     }
                            //                 },
                            //                 {
                            //                     "id": "7K2SD",
                            //                     "title": "Activities.jsx",
                            //                     "archivedAt": null,
                            //                     "description": "",
                            //                     "members": [],
                            //                     "labels": [
                            //                         {
                            //                             "id": "l101",
                            //                             "name": "Teamwork",
                            //                             "color": "green"
                            //                         },
                            //                         {
                            //                             "id": "l105"
                            //                         },
                            //                         {
                            //                             "id": "l103"
                            //                         }
                            //                     ],
                            //                     "createdAt": 1601365551048,
                            //                     "dueDate": 1601365561048,
                            //                     "attachments": [],
                            //                     "currGroup": {
                            //                         "groupId": "5H6D9",
                            //                         "createdAt": 1601366751050
                            //                     },
                            //                     "byMember": {
                            //                         "_id": "5f6a2532173d861c5d78c332",
                            //                         "fullname": "mike awsome",
                            //                         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                            //                     }
                            //                 }
                            //             ]
                            //         },
                            //         {
                            //             "id": "2D5FR",
                            //             "title": "Dev",
                            //             "archivedAt": false,
                            //             "cards": [
                            //                 {
                            //                     "id": "5KK3V",
                            //                     "title": "EditCard.jsx",
                            //                     "description": "",
                            //                     "members": [],
                            //                     "checklist": [
                            //                         {
                            //                             "id": "M6B0S",
                            //                             "title": "hello",
                            //                             "todos": [
                            //                                 {
                            //                                     "id": "KD23G",
                            //                                     "title": "to this",
                            //                                     "isDone": false
                            //                                 },
                            //                                 {
                            //                                     "id": "KAHN3",
                            //                                     "title": "to that",
                            //                                     "isDone": true
                            //                                 },
                            //                             ],


                            //                         },
                            //                         {
                            //                             "id": "8DKJ3",
                            //                             "title": "YOOOO",
                            //                             "todos": [
                            //                                 {
                            //                                     "id": "KD23G",
                            //                                     "title": "dont this!",
                            //                                     "isDone": false
                            //                                 },
                            //                                 {
                            //                                     "id": "KAHN3",
                            //                                     "title": "dont that!",
                            //                                     "isDone": false
                            //                                 },
                            //                             ],
                            //                         },
                            //                     ],

                            "archivedAt": null,
                            "members": [
                            ],
                            "labels": [
                                {
                                    "id": "l101",
                                    "name": "Default",
                                    "color": "green"
                                }
                            ],
                            "createdAt": 1601366751048,
                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },
                            "attachments": ["https://res.cloudinary.com/taskit-sprint/image/upload/v1622319336/background%20for%20Taskit/background_5_ymjrkv.jpg"],
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": 1601366751048
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c321",
                                "fullname": "tuki taka",
                                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                            }
                        },
                        {
                            "id": "7K7YD",
                            "title": "Everything",
                            "archivedAt": null,
                            "description": "This is very important!",
                            "members": [],
                            "labels": [
                                {
                                    "id": "l102"
                                },
                                {
                                    "id": "l105"
                                },
                                {
                                    "id": "l103"
                                }
                            ],
                            "createdAt": 1601365551048,
                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },
                            "attachments": [],
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": 1601366751050
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c332",
                                "fullname": "mike awsome",
                                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                            }
                        }
                    ]
                },
                {
                    "id": "K2D5f",
                    "title": "Dev",
                    "archivedAt": false,
                    "cards": [
                    ]
                }
            ]
        },
        {
            "_id": "XNuugp6UQjDNZIqKuP70vV7b",
            "title": "ToDo List!!!",
            "isArchived": false,
            "isTemplate": true,
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
            "activities": [
                {
                    "id": "nsH78L",
                    "txtCard": "Oded Alon added this card to Dev",
                    "txtBoard": "Oded Alon added Full Backend to Dev",
                    "commentTxt": "",
                    "createdAt": 1622641729814,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Oded Alon",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg"
                    },
                    "card": {
                        "id": "YCAURs",
                        "title": "Full Backend"
                    }
                },
                {
                    "id": "BEOzOa",
                    "txtCard": "Aviv Azulay marked the due date complete",
                    "txtBoard": "Aviv Azulay marked the due date on Cmps complete",
                    "commentTxt": "",
                    "createdAt": 1622641649424,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "Aviv Azulay",
                        "imgUrl": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg"
                    },
                    "card": {
                        "id": "7K2SD",
                        "title": "Activities.jsx"
                    }
                }
            ],
            "createdBy": {
                "_id": "5f6a2532173d861c5d78c332",
                "fullname": "mike awsome",
                "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
            },
            "style": {
                "id": "LD2D5",
                "fontClr": "#f9f9f9",
                "bgImg": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319332/background%20for%20Taskit/background_20_quuo0j.jpg"
            },
            "members": [
                {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "Oded Alon",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "Aviv Azulay",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c321",
                    "fullname": "Gad Refaeli",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c320",
                    "fullname": "Matan Crispel",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg`
                }
            ],
            "groups": [
                {
                    "id": "5H6D9",
                    "title": "Cmps",
                    "archivedAt": false,
                    "cards": [
                        {
                            "id": "5K24K",
                            "title": "EdidCard.jsx",
                            "description": "",
                            "checklist": [],
                            "archivedAt": null,
                            "members": [],
                            "labels": [
                                {
                                    "id": "l101"
                                }
                            ],
                            "createdAt": 1601366751048,
                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },
                            "attachments": [
                                "https://res.cloudinary.com/taskit-sprint/image/upload/v1622641585/at0x1f0faauizw8zoler.jpg"
                            ],
                            "currGroup": {
                                "groupId": "5H6D9",
                                "createdAt": 1601366751048
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c321",
                                "fullname": "tuki taka",
                                "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
                            }
                        },
                        {
                            "id": "7K2SD",
                            "title": "Activities.jsx",
                            "archivedAt": null,
                            "description": "",
                            "members": [],
                            "labels": [
                                {
                                    "id": "l101",
                                    "name": "Teamwork",
                                    "color": "green"
                                },
                                {
                                    "id": "l105"
                                },
                                {
                                    "id": "l103"
                                }
                            ],
                            "createdAt": 1601365551048,
                            "dueDate": {
                                "time": 1601365561048,
                                "isCompleted": false
                            },
                            "attachments": [],
                            "currGroup": {
                                "groupId": "5H6D9",
                                "createdAt": 1601366751050
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c332",
                                "fullname": "mike awsome",
                                "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
                            }
                        }
                    ]
                },
                {
                    "id": "2D5FR",
                    "title": "Dev",
                    "archivedAt": false,
                    "cards": [
                        {
                            "id": "5KK3V",
                            "title": "EditCard.jsx",
                            "description": "",
                            "members": [],
                            "checklist": [
                                {
                                    "id": "M6B0S",
                                    "title": "hello",
                                    "todos": [
                                        {
                                            "id": "KD23G",
                                            "title": "to this",
                                            "isDone": false
                                        },
                                        {
                                            "id": "KAHN3",
                                            "title": "to that",
                                            "isDone": true
                                        }
                                    ]
                                },
                                {
                                    "id": "8DKJ3",
                                    "title": "YOOOO",
                                    "todos": [
                                        {
                                            "id": "KD23G",
                                            "title": "dont this!",
                                            "isDone": false
                                        },
                                        {
                                            "id": "KAHN3",
                                            "title": "dont that!",
                                            "isDone": false
                                        }
                                    ]
                                }
                            ],
                            "archivedAt": null,
                            "labels": [
                                {
                                    "id": "l101",
                                    "name": "Default",
                                    "color": "green"
                                }
                            ],
                            "createdAt": 1601366751048,
                            "dueDate": {
                                "time": 1601365561048,
                                "isCompleted": false
                            },
                            "attachments": [
                                "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319336/background%20for%20Taskit/background_5_ymjrkv.jpg"
                            ],
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": 1601366751048
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c321",
                                "fullname": "tuki taka",
                                "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
                            }
                        },
                        {
                            "id": "7K7YD",
                            "title": "Everything",
                            "archivedAt": null,
                            "description": "This is very important!",
                            "members": [],
                            "labels": [
                                {
                                    "id": "l102"
                                },
                                {
                                    "id": "l105"
                                },
                                {
                                    "id": "l103"
                                }
                            ],
                            "createdAt": 1601365551048,
                            "dueDate": {
                                "time": 1601365561048,
                                "isCompleted": false
                            },
                            "attachments": [],
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": 1601366751050
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c332",
                                "fullname": "mike awsome",
                                "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
                            }
                        },
                        {
                            "title": "Full Backend",
                            "id": "YCAURs",
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": "2021-06-02T13:48:49.814Z"
                            },
                            "members": [],
                            "labels": [],
                            "attachments": [
                                "https://res.cloudinary.com/taskit-sprint/image/upload/v1622641770/mxcpsy1mxnsyzvhv5hkn.jpg"
                            ],
                            "checklist": []
                        }
                    ]
                },
                {
                    "id": "K2D5f",
                    "title": "Dev",
                    "archivedAt": false,
                    "cards": []
                }
            ]
        },
        {
            "_id": "8f72ea5a1ab1fc0017450368",
            "title": "ToDo List!!!",
            "isArchived": false,
            "isTemplate": true,
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
            "activities": [
                // {
                //     "id": "2DVJ3",
                //     "txt": "moved the card",
                //     "commentTxt": "",
                //     "createdAt": 1601367036803,
                //     "byMember": {
                //         "_id": "5f6a2528973d861c5d78c355",
                //         "fullname": "puki ben david",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {
                //         "id": "7K7YD",
                //         "title": "EdidCard.jsx",
                //     },
                // },
                // {
                //     "id": "2LD34",
                //     "txt": "moved the group",
                //     "commentTxt": "",
                //     "createdAt": 1601367032102,
                //     "byMember": {
                //         "_id": "5f6a2528973d861c5d78c355",
                //         "fullname": "puki ben david",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {
                //         "id": "7K7YD",
                //         "title": "EdidCard.jsx",
                //     },
                // },
                // {
                //     "id": "2LG8E",
                //     "txt": "",
                //     "commentTxt": "deleted card content",
                //     "createdAt": 1601366968534,
                //     "byMember": {
                //         "_id": "5f6a2532173d861c5d78c332",
                //         "fullname": "mike awsome",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {
                //         "id": "5K24K",
                //         "title": "EdidCard.jsx",
                //     },
                //     "group": {
                //         "id": "5H6D9",
                //         "title": "Cmps",
                //     }
                // },
                // {
                //     "id": "2D6J2",
                //     "txt": "edited the group",
                //     "commentTxt": "",
                //     "createdAt": 1601367016951,
                //     "byMember": {
                //         "_id": "5f6a2532173d861c5d78c332",
                //         "fullname": "mike awsome",
                //         "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                //     },
                //     "card": {
                //         "id": "5K24K",
                //         "title": "EdidCard.jsx",
                //     },
                //     "group": {
                //         "id": "5H6D9",
                //         "title": "Cmps",
                //     }
                // }
            ],
            "createdBy": {
                "_id": "5f6a2532173d861c5d78c332",
                "fullname": "mike awsome",
                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
            },
            "style": {
                "id": "LD2D5",
                "fontClr": "#f9f9f9",
                "bgImg": "https://res.cloudinary.com/taskit-sprint/image/upload/v1622319325/background%20for%20Taskit/background_17_nktykt.jpg"
            },
            "members": [
                {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "Oded Alon",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "Aviv Azulay",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c321",
                    "fullname": "Gad Refaeli",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg`
                },
                {
                    "_id": "5f6a2532173d861c5d78c320",
                    "fullname": "Matan Crispel",
                    "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg`
                }
            ],
            "groups": [
                {
                    "id": "5H6D9",
                    "title": "Cmps",
                    "archivedAt": false,
                    "cards": [
                        {
                            "id": "5K24K",
                            "title": "EdidCard.jsx",
                            "description": "",
                            "checklist": [],
                            "archivedAt": null,
                            "members": [],
                            "labels": [
                                {
                                    "id": "l101"
                                }
                            ],
                            "createdAt": 1601366751048,
                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },
                            "attachments": [],

                            "currGroup": {
                                "groupId": "5H6D9",
                                "createdAt": 1601366751048
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c321",
                                "fullname": "tuki taka",
                                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                            }
                        },
                        {
                            "id": "7K2SD",
                            "title": "Activities.jsx",
                            "archivedAt": null,
                            "description": "",
                            "members": [],
                            "labels": [
                                {
                                    "id": "l101",
                                    "name": "Teamwork",
                                    "color": "green"
                                },
                                {
                                    "id": "l105"
                                },
                                {
                                    "id": "l103"
                                }
                            ],
                            "createdAt": 1601365551048,
                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },

                            "attachments": [],
                            "currGroup": {
                                "groupId": "5H6D9",
                                "createdAt": 1601366751050
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c332",
                                "fullname": "mike awsome",
                                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                            }
                        }
                    ]
                },
                {
                    "id": "2D5FR",
                    "title": "Dev",
                    "archivedAt": false,
                    "cards": [
                        {
                            "id": "5KK3V",
                            "title": "EditCard.jsx",
                            "description": "",
                            "checklist": [
                                {
                                    "id": "M6B0S",
                                    "title": "hello",
                                    "todos": [
                                        {
                                            "id": "KD23G",
                                            "title": "to this",
                                            "isDone": false
                                        },
                                        {
                                            "id": "KAHN3",
                                            "title": "to that",
                                            "isDone": true
                                        },
                                    ],


                                },
                                {
                                    "id": "8DKJ3",
                                    "title": "YOOOO",
                                    "todos": [
                                        {
                                            "id": "KD23G",
                                            "title": "dont this!",
                                            "isDone": false
                                        },
                                        {
                                            "id": "KAHN3",
                                            "title": "dont that!",
                                            "isDone": false
                                        },
                                    ],
                                },
                            ],

                            "archivedAt": null,
                            "members": [{
                                "_id": "5f6a2532173d861c5d7d02n8",
                                "fullname": "Tuki Taka",
                                "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg`
                            }],
                            "labels": [
                                {
                                    "id": "l101",
                                    "name": "Default",
                                    "color": "green"
                                }
                            ],
                            "createdAt": 1601366751048,
                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },
                            "attachments": ["https://res.cloudinary.com/taskit-sprint/image/upload/v1622319336/background%20for%20Taskit/background_5_ymjrkv.jpg"],
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": 1601366751048
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c321",
                                "fullname": "tuki taka",
                                "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg`
                            }
                        },
                        {
                            "id": "7K7YD",
                            "title": "Everything",
                            "archivedAt": null,
                            "description": "This is very important!",
                            "members": [],
                            "labels": [
                                {
                                    "id": "l102"
                                },
                                {
                                    "id": "l105"
                                },
                                {
                                    "id": "l103"
                                }
                            ],
                            "createdAt": 1601365551048,
                            "dueDate": {
                                "time": 1701396951048,
                                "isCompleted": false
                            },
                            "attachments": [],
                            "currGroup": {
                                "groupId": "2D5FR",
                                "createdAt": 1601366751050
                            },
                            "byMember": {
                                "_id": "5f6a2532173d861c5d78c332",
                                "fullname": "mike awsome",
                                "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg`
                            }
                        }
                    ]
                },
                {
                    "id": "K2D5f",
                    "title": "Dev",
                    "archivedAt": false,
                    "cards": [
                    ]
                }
            ]
        },
        
    ]
}



