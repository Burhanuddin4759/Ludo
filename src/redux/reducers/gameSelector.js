export const selectCurrentPositions = state => state.game.currentPositions
export const selectCurrentPlayerChance = state => state.game.chancePlayer
export const selectDiceRolled = state => state.game.isDiceRolled
export const selectDiceNumber = state => state.game.diceNo

export const selectPlayer1 = state => state.game.player1
export const selectPlayer2 = state => state.game.player2
export const selectPlayer3 = state => state.game.player3
export const selectPlayer4 = state => state.game.player4

export const selectPocketPileSelection = state => state.game.pileSelectionPlayer
export const selectCellSelection = state => state.game.cellSelectionPlayer
export const selectDiceTouch = state => state.game.touchDiceBlock
export const selectFireWorks = state => state.game.fireworks


// A game is "in progress" if at least one piece has left home and no winner has been declared yet
export const selectIsGameInProgress = state =>
    state.game.currentPositions.length > 0 && state.game.winner === null