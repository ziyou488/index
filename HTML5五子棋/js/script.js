var game = {
    centent: document.getElementById("centent"),
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),
    regret_chess: document.getElementById("button"),
    anew: document.getElementById("anew"),
    state: document.getElementById("state"),
    sChesee: document.getElementsByClassName("state-chess")[0],
    cName: document.getElementsByClassName("chessName")[0],
    winner: document.getElementById("winner"),
    winChesee: this.winner.getElementsByClassName("state-chess")[0],
    winName: this.winner.getElementsByClassName("chessName")[0],
    e: 0,
    chess_Board: [],
    chess_Name: ["黑棋","白棋"],
    h: [],
    um: 0,
    lianz: [],
    winXY: [[1,0],[0,1],[1,1],[1,-1]],
    chessOff: true,
    computerChess: function(){

    },
    drawLine: function(){
        //console.log(game.c === this.c)
        for(var i = 1; i <= 14; i++){
            game.ctx.moveTo(i * 30 + .5, 420)
            game.ctx.lineTo(i * 30 + .5,30)
            game.ctx.moveTo(30,i * 30 + .5)
            game.ctx.lineTo(420,i * 30 + .5)
            game.ctx.strokeStyle = "#C0A27B";
            game.ctx.stroke()
        }
        for(var i = 0; i <= 13; i++){
            game.chess_Board[i] = [];
            game.lianz[i] = [];
            for(var j = 0; j <= 13; j++){
                game.chess_Board[i][j] = 0;
                game.lianz[i][j] = 0;
            }
        }
    },
    canvasClick: function(e){
        var dx = parseInt(Math.floor(e.offsetX + 15) / 30);
        var dy = parseInt(Math.floor(e.offsetY + 15) / 30);
        var WBobj = {
            ox: (dx * 30) - 25,
            oy: (dy * 30) - 25,
            mz: game.chess_Name[game.e % 2],
            dm: document.createElement("div"),
            class: game.e % 2 == 1 ? "Wchess" : "Bchess",
            list: game.um++,
        }
        if(dx < 1 || dx > 14 | dy < 1 || dy > 14)return;
        if( game.chess_Board[dx - 1][dy - 1] == 0){
            game.h.push(WBobj)
            WBobj.dm.classList.add( WBobj.class);
            WBobj.dm.style.left = WBobj.ox + "px";
            WBobj.dm.style.top = WBobj.oy + "px";
            game.chess_Board[dx - 1][dy - 1] = game.chess_Name[game.e % 2];
            game.lianz[dx - 1][dy - 1] = WBobj.dm;
            game.win(dx - 1,dy - 1,game.chess_Name[game.e % 2],game.winXY[0],game.e % 2)
            game.win(dx - 1,dy - 1,game.chess_Name[game.e % 2],game.winXY[1],game.e % 2)
            game.win(dx - 1,dy - 1,game.chess_Name[game.e % 2],game.winXY[2],game.e % 2)
            game.win(dx - 1,dy - 1,game.chess_Name[game.e % 2],game.winXY[3],game.e % 2)
            game.cName.innerText = game.e % 2 == 0 ? game.chess_Name[1] + "走" : game.chess_Name[0] + "走";
            game.sChesee.className = game.e % 2 == 1 ? "state-chess Bchess" : "state-chess Wchess";
            game.e++;
            game.centent.appendChild(WBobj.dm)
        }

    },

    regret: function(e){
        if(game.chessOff){
            if(game.h.length > 0){
                let obj =  game.h.pop();
                let rmRm = obj.dm;
                    rmRm.remove()
                    game.cName.innerText = game.e % 2 == 0 ? game.chess_Name[1] + "走" : game.chess_Name[0] + "走";
                    game.sChesee.className = game.e % 2 == 1 ? "state-chess Bchess" : "state-chess Wchess";
                    game.e -=1;
                    game.um-=1;
                    game.chess_Board[parseInt(obj.ox/30)][parseInt(obj.oy/30)] = 0;
                    
                }else{
                    return;
                }
            }else{
                
                return;
            }
        
        },

    anewClick: function(e){
        game.h.forEach(function(v,i){
            v.dm.remove()
            game.h = []
            game.um = 0;
            game.chessOff = true;
        })
        for(var i = 0; i <= 13; i++){
            game.chess_Board[i] = [];
            game.lianz[i] = [];
            for(var j = 0; j <= 13; j++){
                game.chess_Board[i][j] = 0;
                game.lianz[i][j] = 0;
            }
        }
        game.winName.innerText = ' ';
        game.winner.style.display = "none";
        game.regret_chess.style.background = '';
        game.regret_chess.style.color = '';
    },

    win: function(x,y,c,m,li){
        let ms = 1;
        var continuity = [];
        for(let i = 1; i < 5; i++){
            if(game.chess_Board[x + i * m[0]]){
                if(game.chess_Board[x + i * m[0]][y + i * m[1]] === c){
                    continuity.push([x + i * m[0],y + i * m[1]]) 
                    ms++;
                }else{
                    break;
                }
            }
        }
    
        for(let i = 1; i < 5; i++){
            if( game.chess_Board[x - i * m[0]]){
                if( game.chess_Board[x - i * m[0]][y - i * m[1]] === c){
                    continuity.push([x - i * m[0],y - i * m[1]]) 
                    ms++;
                }else{
                    break;
                }
            }
        }
    
        if(ms >= 5){
            //alert(c + "赢了")
            setTimeout(function(){
                console.log(c + "赢了")
            },600)
            continuity.push([x,y]);
            game.chessOff = false;
            game.regret_chess.style.background = '#d0cdcd';
            game.regret_chess.style.color = '#505050';
            let s = 5;
            let ls = [270,300,330,360,390];
            let ls1 = [390,420,450,480,510];
            continuity.forEach(function(value,index){
                let time = setInterval(function(){
                    game.lianz[value[0]][value[1]].style.transform = 'scale(0.9)';
                    game.lianz[value[0]][value[1]].style.boxShadow = "0px 0px 2px 2px #ffd507";
                    s--;
                    s <= 0 ? clearInterval(time) : clearInterval(time);
                },ls[index])
                let time2 = setInterval(function(){
                    game.lianz[value[0]][value[1]].style.transform = 'scale(1)';
                    game.lianz[value[0]][value[1]].style.boxShadow = "0px 0px 2px 2px #ffd507";
                    s++
                    s >= 5 ? clearInterval(time2) : clearInterval(time2);
                },ls1[index])
            })

            for(var i = 0; i < game.chess_Board.length; i++){
                for(var j = 0; j < game.chess_Board.length; j++){
                    if(game.chess_Board[i][j] === 0){
                       game.chess_Board[i][j] = "null";
                    }
                }
            }
            
            game.h.forEach(function(value,index){
                value.dm.innerText = value.list;
            })

            li == 1 ? game.winChesee.className = "state-chess Wchess" : game.winChesee.className = "state-chess Bchess";
            game.winName.innerText = c + "赢了";
            this.winner.style.display = "block";
        }
    },
 
};

