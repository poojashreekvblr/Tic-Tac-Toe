import { useState } from "react";

function Game(){
    const[turn,setTurn]=useState('');
    const[turn1,setTurn1]=useState([]);
    const[turn2,setTurn2]=useState([]);
    const[winner,setWinner]=useState(null);
    const[player1Symbol, setPlayer1Symbol] = useState(''); 
    const[player2Symbol, setPlayer2Symbol] = useState('');  
    function handleClick(id,name){
        const val=document.getElementById(id);
        if(val.innerHTML!=='' || winner){
            return;
        }
        if(turn===1){
            val.value="X";
            val.innerHTML="X";
            setTurn1((prev)=>[...prev,name]);
            if(isWinner([...turn1,name])){
                setWinner(player1Symbol==='X'?"Player 1":"Player 2");
                return;
            }
            setTurn(2);
        }
        else{
            val.value="O";
            val.innerHTML="O";
            setTurn2((prev)=>[...prev,name])
            if(isWinner([...turn2,name])){
                setWinner(player2Symbol==='X'?"Player 1":"Player 2");
                return;
            }
            setTurn(1);
        }
        if(isBoardFull() && !winner){
            setWinner("Draw");
        }
    }
    function isBoardFull(){
        for(let i=1;i<=9;i++){
            const val=document.getElementById(`button-${i}`);
            if(val.innerHTML==='')
                return false;
        }
        return true;
    }
    function isWinner(moves){
        const comb=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        const move=new Set(moves);
        return comb.some(row=>row.every((element)=>move.has(element))); 
    }
    function reset(){
        setTurn('');
        setTurn1([]);
        setTurn2([]);
        setWinner(null);
        for(let i=1;i<=9;i++){
            const button=document.getElementById(`button-${i}`);
            button.value='';
            button.innerHTML='';
        }
    }
    function selectSymbol(symbol) {
        if (symbol === 'X') {
            setPlayer1Symbol('X');
            setPlayer2Symbol('O');
            setTurn(1); 
        } else {
            setPlayer1Symbol('O');
            setPlayer2Symbol('X');
            setTurn(2); 
        }
    }
    const backgroundStyle1 = turn === 1 ? { backgroundColor: "rgb(255 241 242)" } :{};
    const backgroundStyle2 =turn===2?{backgroundColor:"rgb(255 241 242)"}:{};
    return(
        <div class="bg-[#0c0c0c]">
        <h1 class="text-center text-9xl text-[#97350a] text-shadow mt-5 mb-5 font-[TrebuchetMS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif]">Tic-Tac-Toe</h1>
        {turn===''?(<div class="flex items-center justify-center flex-col">
        <h3 class="text-5xl mt-20 text-center text-orange-400">Select the player</h3>
        <div>
        <button onClick={()=>{selectSymbol('X')}} class="text-8xl bg-black shadow-[5px_5px_1px_rgb(76,47,5)] border-0 text-orange-800 w-[100px] h-[100px] mx-[200px] mt-[100px]">X</button>
        <button onClick={()=>{selectSymbol('O')}} class="text-8xl bg-black shadow-[5px_5px_1px_rgb(76,47,5)] border-0 text-orange-800 w-[100px] h-[100px] mx-[200px] mt-[100px]">O</button>
        </div>
        </div>):(
        <div class="main absolute flex flex-col">
            <div class="flex">
                <h3 style={backgroundStyle1} class="text-lg text-red-700 ml-[350px] mt-10 border-2 border-[#c4a20b] py-[10px] px-[100px]">Player 1:{player1Symbol}</h3>
                <h3 style={backgroundStyle2} class="text-lg text-red-700 ml-[350px] mt-10 border-2 border-[#c4a20b] py-[10px] px-[100px]">Player 2:{player2Symbol}</h3>
            </div>
            {winner==="X" && <h3 class="text-3xl text-center mt-0 ml-[25%] mb-10 text-[#8eb71d] ">Winner:Player 1</h3>}
            {winner==="O" && <h3 class="text-3xl text-center mt-0 ml-[25%] mb-10 text-[#8eb71d] ">Winner:Player 2</h3>}
            {winner==="Draw" && <h3 class="text-3xl text-center mt-0 ml-[25%] mb-10 text-[#8eb71d] ">Draw</h3>}
            <div class="row ml-[650px] flex">
            <button name="1" value="" onClick={()=>handleClick("button-1",1)} type="button" id="button-1" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-r-2 border-b-2 hover:bg-slate-200"></button>
            <button name="2" value="" onClick={()=>handleClick("button-2",2)} type="button" id="button-2" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-r-2 border-b-2 hover:bg-slate-200"></button>
            <button name="3" value="" onClick={()=>handleClick("button-3",3)} type="button" id="button-3" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-b-2 hover:bg-slate-200"></button>
            </div>
            <div class="row ml-[650px] flex">
            <button name="4" value="" onClick={()=>handleClick("button-4",4)} type="button" id="button-4" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl hover:bg-slate-200"></button>
            <button name="5" value="" onClick={()=>handleClick("button-5",5)} type="button" id="button-5" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-l-2 hover:bg-slate-200"></button>
            <button name="6" value="" onClick={()=>handleClick("button-6",6)} type="button" id="button-6" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-l-2 hover:bg-slate-200"></button>
            </div>
            <div class="row ml-[650px] flex">
            <button name="7" value="" onClick={()=>handleClick("button-7",7)} type="button" id="button-7" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-t-2 border-r-2 hover:bg-slate-200"></button>
            <button name="8" value="" onClick={()=>handleClick("button-8",8)} type="button" id="button-8" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-t-2 border-r-2 hover:bg-slate-200"></button>
            <button name="9" value="" onClick={()=>handleClick("button-9",9)} type="button" id="button-9" class="w-[100px] h-[100px] bg-black text-red-600 text-5xl border-t-2 hover:bg-slate-200"></button>
            </div>
            <button type="button" onClick={reset} class="text-3xl h-[40px] w-[200px] ml-[55%] mt-[40px] bg-[#cf770c] shadow-[2px_2px_2px_rgb(80,52,18)]">Reset</button>
        </div>
        )};
        </div>
    );
}

export default Game;