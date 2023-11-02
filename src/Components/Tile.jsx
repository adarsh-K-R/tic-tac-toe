function Tile({className, value, onClick, playerTurn}) {
    let hoverClass = null;
    if(value == null && playerTurn != null){
        hoverClass = `${playerTurn.toLowerCase()}-hover`;
    }
    let glowClass = null;
    if(value === "X"){
        glowClass = "glow-x";
    }
    else if(value === "O"){
        glowClass = "glow-o";
    }
    return ( 
        <div onClick={onClick} className={`tile ${className} ${hoverClass} ${glowClass}`}>{value}</div>
     );
}

export default Tile;