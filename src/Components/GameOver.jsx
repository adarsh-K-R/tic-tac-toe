import GameState from "./GameState";

function GameOver({gameState}) {
    switch(gameState){
        case GameState.playerXWins:
            return <div className="game-over">Player X Wins!</div>;
        case GameState.playerOWins:
            return <div className="game-over">Player O Wins!</div>;
        case GameState.draw:
            return <div className="game-over">It's a Tie!</div>;
        default:
            return null;
    }
}

export default GameOver;