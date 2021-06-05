
// BoardService
function createActivity(partialActivity) {
    // activity = {txt:'your text here'}
    // This fn needs to receive an object with the card id and title and the text in theh following format:
    // send to this fn:
    // txt
    // card id
    // card title
    // comment txt as blank

    const user = userService.getLoggedInUser()

    const activity = {
        "id": utils.makeId(),
        "txt": partialActivity.txt,
        "commentTxt": partialActivity.commentTxt,
        "createdAt": Date.now(),
        "byMember": {
            "_id": user._id,
            "fullName": user.fullName,
            "imgUrl": user.imgUrl
        }
    }
    if (partialActivity.card) {
        activity.card = {
            "id": partialActivity.card.id,
            "title": partialActivity.card.title
        }
    }
    if (!partialActivity.group) {
        activity.group = { ...partialActivity.group }
    }

    return activity

}

// BoardActions
export function addActivity(board, activity) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            if (!newBoard.activities) newBoard.activities = []
            newBoard.activities.unshift(activity)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error removing board', err)
        }
    }
}