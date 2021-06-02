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
    updateActivityList
}

let gBoards = getGboards()
let gBoard;

function query(bordId) {
    if (gBoard) updateBoards() //updates the boards array at every change by the current board
    gBoard = getBoardById(bordId)
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
            "fullname": "puki ben david",
            "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
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
                            "dueDate": 1701396951048,
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
                            "dueDate": 1601365561048,
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
                            "dueDate": null,
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
                            "dueDate": null,
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
                    "txtCard": "puki ben david added this card to Dev",
                    "txtBoard": "puki ben david added Full Backend to Dev",
                    "commentTxt": "",
                    "createdAt": 1622641729814,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "puki ben david",
                        "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
                    },
                    "card": {
                        "id": "YCAURs",
                        "title": "Full Backend"
                    }
                },
                {
                    "id": "BEOzOa",
                    "txtCard": "puki ben david marked the due date complete",
                    "txtBoard": "puki ben david marked the due date on Cmps complete",
                    "commentTxt": "",
                    "createdAt": 1622641649424,
                    "byMember": {
                        "_id": "5f6a2528973d861c5d78c355",
                        "fullname": "puki ben david",
                        "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
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
                            "dueDate": 1701396951048,
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
                            "dueDate": 1601365561048,
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
                            "members": [
                                {
                                    "_id": "5f6a2532173d861c5d7d02n8",
                                    "fullname": "Tuki Taka",
                                    "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4"
                                }
                            ],
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
                            "dueDate": null,
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
                            "dueDate": null,
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
                            "dueDate": 1701396951048,
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
                            "dueDate": 1601365561048,
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
                                "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                            }],
                            "labels": [
                                {
                                    "id": "l101",
                                    "name": "Default",
                                    "color": "green"
                                }
                            ],
                            "createdAt": 1601366751048,
                            "dueDate": null,
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
                            "dueDate": null,
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

    ]
}



