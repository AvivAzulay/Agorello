import React, { Component } from 'react';
import { loadBoard } from '../store/action/board.action';
import { connect } from 'react-redux';
// import { toast } from 'react-toastify';
import { Doughnut, Bar } from 'react-chartjs-2';

export default class _DashboardAnalisys extends Component {

    getRndHexColor = () => {
        const n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    }

    getDataForChart = (mapObject) => {
        const rndClrs = Object.keys(mapObject).map(key => this.getRndHexColor())
        return {
            labels: Object.keys(mapObject),
            datasets: [{
                label: '# of Cards',
                data: Object.values(mapObject),
                backgroundColor: rndClrs,
                hoverBackgroundColor: rndClrs,
            }]
        };
    }

    dashboardNumbers = (board) => {
        if (!board || !board.members || !board.groups) return;
        let numOfMembers = board.members.length;
        let unarchivedCardsCount = 0;
        let archivedCardsCount = 0;
        board.groups.forEach(group => {
            const archivedCards = group.cards.filter(card => card.archivedAt);
            archivedCardsCount += archivedCards.length;
            unarchivedCardsCount += group.cards.length - archivedCards.length;
        })
        const cards = board.groups.reduce((acc, group) => [...acc, ...group.cards], []);
        const todosCount = cards.reduce((acc, card) => {
            if (!card.checklist) return acc;
            console.log(card.checklist);
            card.checklist.forEach(checklist => {
                checklist.todos.forEach(todo => {
                    if (todo.isDone) acc.checked++;
                    acc.total++;
                })
            })
            return acc;
        }, { checked: 0, total: 0 });
        console.log(todosCount);
        if (todosCount.checked / todosCount.total > 0.75) todosCount.colorClass = 'todos-green';
        if (todosCount.checked / todosCount.total <= 0.5) todosCount.colorClass = 'todos-red';
        return { numOfMembers, archivedCardsCount, unarchivedCardsCount, todosCount };
    }

    cardsByGroups = (groups) => {
        if (!groups) return;
        const cardsByGroupsMap = groups.reduce((acc, group) => {
            const unArchivedCards = group.cards.filter(card => !card.archivedAt)
            acc[group.title] = unArchivedCards.length;
            return acc;
        }, {});
        return this.getDataForChart(cardsByGroupsMap);
    }

    cardsByMembers = (board) => {
        if (!board.members) return;
        console.log('board', board);
        const cardsByMembersMap = board.members.reduce((acc, member) => {
            let memberCardsCount = 0;
            for (let i = 0; i < board.groups.length; i++) {
                const unArchivedCards = board.groups[i].cards.filter(card => !card.archivedAt)
                for (let j = 0; j < unArchivedCards.length; j++) {
                    if (unArchivedCards[j].members.some(currMember => currMember._id === member._id)) memberCardsCount++;
                }
            }
            acc[member.fullname] = memberCardsCount;
            return acc;
        }, {});
        return {
            data: this.getDataForChart(cardsByMembersMap),
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        };
    }

    cardsByLabels = (groups, labels) => {
        if (!groups || !labels) return;
        const colorsMap = {
            green: '#61BD4F',
            yellow: '#F2D600',
            orange: '#FF9F1A',
            red: '#EB5A46',
            purple: '#C377E0',
            blue: '#028ad8',
            grey: '#a7a7a7',
            black: '#202020'
        }
        let cards = groups.reduce((acc, group) => [...acc, ...group.cards], []);
        cards = cards.filter(card => !card.archivedAt);
        const labelsMap = labels.reduce((acc, currLabel) => {
            let cardsWithLabelCount = 0;
            cards.forEach(card => {
                if (card.labels.some(label => label.id === currLabel.id)) cardsWithLabelCount++;
            })
            acc[currLabel.id] = { name: currLabel.name, color: currLabel.color, count: cardsWithLabelCount };
            return acc;
        }, {})
        return {
            data: {
                labels: Object.keys(labelsMap).map(label => labelsMap[label].name),
                datasets: [
                    {
                        label: '# of Labels',
                        borderWidth: 1,
                        backgroundColor: Object.keys(labelsMap).map(label => colorsMap[labelsMap[label].color]),
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: Object.keys(labelsMap).map(label => labelsMap[label].count),
                    }
                ]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        }

    }

    render() {
        const { board } = this.props;
        if (!board) return <div>Loading...</div>;
        const dashboardNumbers = this.dashboardNumbers(board);
        const cardsByGroups = this.cardsByGroups(board.groups);
        const cardsByMembers = this.cardsByMembers(board);
        const cardsByLabels = this.cardsByLabels(board.groups, board.labels)
        return !board
            ? <div>Loading...</div>
            : <div className="page-container">
                <div className="analysis-dashboard-container">
                    {dashboardNumbers && <div className="chart-container summary-numbers-conatiner">
                        <div><h3>{dashboardNumbers.numOfMembers}</h3><span>Total Members</span></div>
                        <div>
                            <h3>
                                {dashboardNumbers.unarchivedCardsCount}
                                <span className="total">{` (${dashboardNumbers.archivedCardsCount} archived)`}</span>
                            </h3>
                            <span>Cards On Board</span>
                        </div>
                        <div>
                            <h3 className={dashboardNumbers.todosCount.colorClass}>
                                {`${dashboardNumbers.todosCount.checked}`}
                                <span className="total">{` /${dashboardNumbers.todosCount.total}`}</span>
                            </h3><span>To-Dos Checked</span></div>
                    </div>}
                    {cardsByGroups && <div className="chart-container cards-by-group-container">
                        <h3>Cards Per Group</h3>
                        <Doughnut data={cardsByGroups} />
                    </div>}
                    {cardsByMembers && <div className="chart-container cards-by-member-container">
                        <h3>Cards Per Member</h3>
                        <Bar data={cardsByMembers.data} options={cardsByMembers.options} />
                    </div>}
                    {<div className="chart-container time-in-groups-container">
                        <h3>Groups' Time Analysis</h3>
                        <Bar />
                    </div>}
                    {cardsByLabels && <div className="chart-container cards-by-labels-container">
                        <h3>Labels Summary</h3>
                        <Bar data={cardsByLabels.data} options={cardsByLabels.options} />
                    </div>}
                </div>
            </div >
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
    };
}

const mapDispatchToProps = {
    loadBoard,
}

export const DashboardAnalisys = connect(mapStateToProps, mapDispatchToProps)(_DashboardAnalisys)