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
}

let gBoard = getGboard()

function query() {
    return Promise.resolve(gBoard)
}

function saveGroup(group) {
    if (group.id) {
        const groupIdx = gBoard.groups.findIndex(currGroup => currGroup.id === group.id)
        gBoard.groups[groupIdx] = group
        return Promise.resolve(deepCloneBoard(gBoard))
    }
    else {
        group.id = utilService.makeId()
        group.cards = []
        gBoard.groups.push(group)
        return Promise.resolve(deepCloneBoard(gBoard))
    }
}

function saveCard(card, groupId) {
    if (card.id) {
        const group = gBoard.groups.find(group => group.id === groupId)
        const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
        gBoard.groups[groupIdx] = group
        return Promise.resolve(deepCloneBoard(gBoard))
    }
    else {
        card.id = utilService.makeId()
        const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
        card.currGroup = { groupId: gBoard.groups[groupIdx].id, createdAt: new Date() }
        card.members = []
        gBoard.groups[groupIdx].cards.push(card)
        return Promise.resolve(deepCloneBoard(gBoard))
    }
}

function removeCard(cardId, groupId) {
    console.log('groupId to find', groupId);
    const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
    console.log(gBoard.groups);
    console.log('groupIdx', groupIdx);
    const cardIdx = gBoard.groups[groupIdx].cards.findIndex(card => card.id === cardId)
    console.log('cardIdx', cardIdx);
    gBoard.groups[groupIdx].cards.splice(cardIdx, 1)
    return Promise.resolve(deepCloneBoard(gBoard))
}

function removeGroup(groupId) {
    const groupIdx = gBoard.groups.findIndex(group => group.id === groupId)
    console.log(gBoard.groups)
    gBoard.groups.splice(groupIdx, 1)
    return Promise.resolve(deepCloneBoard(gBoard))
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
    gBoard = board
}

function deepCloneBoard(board) {
    return JSON.parse(JSON.stringify(board))
}


/* <h3 contentEditable>Description</h3> */


/* <h3 contentEditable>Description</h3> */


function getGboard() {
    return {
        "_id": "5f72ea5a1ab1fc0017450368",
        "title": "Trello Dev!!!",
        "isArchived": false,
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
                "id": "2DVJ3",
                "txt": "moved the card",
                "commentTxt": "",
                "createdAt": 1601367036803,
                "byMember": {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "puki ben david",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                "card": {
                    "id": "2L8J2",
                    "title": "Signup"
                },
                "group": {}
            },
            {
                "id": "2LD34",
                "txt": "moved the group",
                "commentTxt": "",
                "createdAt": 1601367032102,
                "byMember": {
                    "_id": "5f6a2528973d861c5d78c355",
                    "fullname": "puki ben david",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                "card": {},
                "group": {
                    "id": "2L4G4",
                    "title": "QA"
                }
            },
            {
                "id": "2LG8E",
                "txt": "",
                "commentTxt": "deleted card content",
                "createdAt": 1601366968534,
                "byMember": {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "mike awsome",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                "card": {
                    "id": "sqLbqQkTgF",
                    "title": "Shaving cream"
                },
                "group": {}
            },
            {
                "id": "2D6J2",
                "txt": "edited the group",
                "commentTxt": "",
                "createdAt": 1601367016951,
                "byMember": {
                    "_id": "5f6a2532173d861c5d78c332",
                    "fullname": "mike awsome",
                    "imgUrl": `https://robohash.org/5f6a2528973d861c5d78c355?set=set4`
                },
                "card": {},
                "group": {
                    "id": "2KE43",
                    "title": "Development"
                }
            }
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
                        "dueDate": null,
                        "attachments": null,
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
                        "attachments": null,
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
                                    },
                                    {
                                        "id": "KAHN3",
                                        "title": "to that"
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
                                    },
                                    {
                                        "id": "KAHN3",
                                        "title": "dont that!"
                                    },
                                ],
                            },
                        ],

                        "archivedAt": null,
                        "members": [{
                            "_id": "5f6a2532173d861c5d78c321",
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
                        "attachments": null,
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
                        "attachments": null,
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
    }
}



