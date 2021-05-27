import { HashRouter as Router, Route } from 'react-router-dom'
import { boardService } from './services/board-service.js'
import './App.css'
import { routes } from './routes.js'
import { Header } from './cmps/Header.jsx'
import { DragDropContext } from 'react-beautiful-dnd'


function onDragStart() {
}

function onDragEnd(result) {

  const { destination, source, draggableId, type } = result

  if (!destination) return
  if (destination.droppableId === source.droppableId && destination.index === source.index) return
  if (!draggableId) return

  if (type === 'card') {
    const startGroupIndex = this.props.board.groups.findIndex(group => group.id === source.droppableId)
    const endGroupIndex = this.props.board.groups.findIndex(group => group.id === destination.droppableId)

    // moving in the same group
    if (source.droppableId === destination.droppableId) {

      const currGroup = this.props.board.groups.find(group => group.id === source.droppableId)
      const currCard = currGroup.cards.find(card => card.id === draggableId)
      const newCardsGroup = Array.from(currGroup.cards)
      newCardsGroup.splice(source.index, 1)
      newCardsGroup.splice(destination.index, 0, currCard)
      const newGroup = { ...currGroup, cards: newCardsGroup }
      const newGroups = [...this.props.board.groups]
      newGroups[startGroupIndex] = newGroup
      const newBoard = { ...this.props.board, groups: newGroups }
      this.props.updatePosition(newBoard)
      // this.props.updateBoard(newBoard)
      return
    }

    // moving between groups
    if (source.droppableId !== destination.droppableId) {

      const destinationGroup = this.props.board.groups.find(group => group.id === destination.droppableId)
      const formerGroup = this.props.board.groups.find(group => group.id === source.droppableId)
      const currCard = formerGroup.cards.find(card => card.id === draggableId)
      const formerCardIndex = formerGroup.cards.findIndex(card => card.id === draggableId)
      const newCardsArray = Array.from(destinationGroup.cards)

      // time analysis
      const currCardTime = currCard.timeAnalysis
      if (currCardTime) {
        currCardTime.timeInGroupsMap[currCardTime.currGroup.groupId] =
          currCardTime.timeInGroupsMap[currCardTime.currGroup.groupId] + (Date.now() - currCardTime.currGroup.enteredAt) ||
          (Date.now() - currCardTime.currGroup.enteredAt)
        currCardTime.currGroup = {
          groupId: destinationGroup.id,
          enteredAt: Date.now()
        }
      }

      newCardsArray.splice(destination.index, 0, currCard)
      formerGroup.cards.splice(formerCardIndex, 1)

      const newGroups = [...this.props.board.groups]
      newGroups[startGroupIndex] = formerGroup
      newGroups[endGroupIndex].cards = newCardsArray

      const newBoard = { ...this.props.board, groups: newGroups }
      this.props.updatePosition(newBoard, draggableId)
      // this.props.updateBoard(newBoard)

      // add activity
      // get the title
      const cardTitle = boardService.getCardTitleById(draggableId, newBoard)
      // build a partial activity
      const partialActivity = {
        "txt": 'moved the card',
        "commentTxt": '',
        "card": {
          "id": draggableId,
          "title": cardTitle
        }
      }

      // const activity = boardService.createActivity(partialActivity)
      // this.props.addActivity(newBoard, activity)
      return
    }
  }

  if (type === 'group') {

    const newGroupsOrder = Array.from(this.props.board.groups)
    const currGroup = this.props.board.groups.find(group => group.id === draggableId)
    newGroupsOrder.splice(source.index, 1)
    newGroupsOrder.splice(destination.index, 0, currGroup)

    const newBoard = {
      ...this.props.board,
      groups: newGroupsOrder
    }
    this.props.updatePosition(newBoard)
    // this.props.updateBoard(newBoard)
    return

  }
}


function App() {
  return (
    <Router>
      <DragDropContext>
        <Header />
        <main>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        </main>
      </DragDropContext>
    </Router>
  )
}

export default App;

// <Route path='/cars' component={CarApp} />
//       <Route path='/' exact component={Home} />