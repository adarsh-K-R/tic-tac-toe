import Board from "./Board";
import { useState, useEffect } from "react";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/over.mov";
import clickSoundAsset from "../sounds/click.mov";
import FireCracker from "./FireCracker";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const Player_X = "X";
const Player_O = "O";

const winningCombos = [
    //Rows
    {combo: [0, 1, 2], strikeClass: "strike-row-1"},
    {combo: [3, 4, 5], strikeClass: "strike-row-2"},
    {combo: [6, 7, 8], strikeClass: "strike-row-3"},

    //Columns
    {combo: [0, 3, 6], strikeClass: "strike-column-1"},
    {combo: [1, 4, 7], strikeClass: "strike-column-2"},
    {combo: [2, 5, 8], strikeClass: "strike-column-3"},

    //Diagonals
    {combo: [0, 4, 8], strikeClass: "strike-diagonal-1"},
    {combo: [2, 4, 6], strikeClass: "strike-diagonal-2"},
];

function checkWinner(tiles, setStrikeClass, setGameState){
    for(const {combo, strikeClass} of winningCombos){
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
            setStrikeClass(strikeClass);
            if(tileValue1 === Player_X){
                setGameState(GameState.playerXWins);
            }
            else{
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    const areAllTilesFilled = tiles.every((tile) => tile != null);
    if(areAllTilesFilled){
        setGameState(GameState.draw);
    }
}

function TicTacToe(){
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(Player_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const current = history[history.length - 1];

    const handleRevert = (index) => {
        if(history.length === 1){
            return;
        }
        setHistory(history.slice(0, index + 1));
        setTiles(history[index]);
        setPlayerTurn(playerTurn === Player_X ? Player_O : Player_X);
        setGameState(GameState.inProgress);
        setStrikeClass(null);
    };

    const handleTileClick = (index) => {
        if(gameState !== GameState.inProgress){
            return;
        }

        if(tiles[index] !== null){
            return;
        }

        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        setHistory([...history, newTiles]);
        if(playerTurn === Player_X){
            setPlayerTurn(Player_O);
        }
        else{
            setPlayerTurn(Player_X);
        }
        console.log(history);
    };

    const handleReset = () => {
        setTiles(Array(9).fill(null));
        setHistory([Array(9).fill(null)]);
        setPlayerTurn(Player_X);
        setStrikeClass(null);
        setGameState(GameState.inProgress);
    };

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    useEffect(() => {
        if(tiles.some((tile) => tile != null)){
            clickSound.play();
        }
    }, [tiles]);

    useEffect(() => {
        if(gameState !== GameState.inProgress){
            gameOverSound.play();
        }
    }, [gameState]);

    return(
        <div>
            <h1>Tic Tac Toe</h1>
            <FireCracker gameState={gameState}/>
            <div className="board-history">
                <Board tiles={current} onTileClick={handleTileClick} playerTurn={playerTurn} strikeClass={strikeClass}/>
                <div className="time-travel">
                    <ul>
                        {history.map((tiles, index) => (
                            <li key={index}>
                                <button className="loc" onClick={()=>handleRevert(index)}>
                                    {index === 0 ? "Go to game start" : `Go to move #${index}`}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <GameOver gameState={gameState}/>
            <Reset gameState={gameState} onReset={handleReset}/>
        </div>
    );
}

export default TicTacToe;