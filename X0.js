const winPattern = [
    ["0", "1", "2"], 
    ["3", "4", "5"], 
    ["6", "7", "8"], 
    ["0", "3", "6"], 
    ["1", "4", "7"], 
    ["2", "5", "8"], 
    ["0", "4", "8"], 
    ["2", "4", "6"]
  ];

  let player;
  let gameOver = false;
  let remainingCells;
  let playerType = false;

  document.addEventListener("change", function(e) {
    const radioButton = e.target;
    if (radioButton.type === "radio" && radioButton.name === "game") {
      player = radioButton.value;
      if(player != null) {
        playerType = true;
      }
      initializeGame();
    }
  });

  function changePlayer() {
    if (player === 'X') {
      player = '0';
    } else if (player === '0') {
      player = 'X';
    }
  }


  function initializeGame() {

    remainingCells = document.querySelectorAll(".container > div").length;
    
    document.addEventListener("click", function(e) {
      if(gameOver) return;
      console.log(playerType);

      const cellOption = e.target;
      if (cellOption.tagName === "DIV" && cellOption.parentNode.classList.contains("container") && !cellOption.classList.contains("disabled") && playerType === true) {
        cellOption.innerHTML = player;
        cellOption.classList.add("disabled");
        remainingCells--;

        if (checkWin()) {
          document.querySelector(".msg").textContent = `Player ${player} won!`;
          gameOver = true;
          remainingCells = -1;
        } else {
          if (remainingCells === 0) {
            document.querySelector(".msg").textContent = "Draw!";
            gameOver = true;
            remainingCells = 0;
          } else {
            changePlayer(); 
          }
        }
      }
    });
  }

  function checkWin() {
    let cells = document.querySelectorAll(".container > div");
    let values = Array.from(cells).map(cell => cell.innerHTML);
    for (let pattern of winPattern) {
      let [a,b,c] = pattern;
      if (values[a] !== "" && values[a] === values[b] &&  values[a] === values[c]) {
        return true;
      }
    }
    return false;
  }

  const resetButton = document.getElementById("restart");
  resetButton.addEventListener("click", resetGame);

  function resetGame() {

    let cells = document.querySelectorAll(".container > div");

    for (let cell of cells) {
      cell.innerHTML = "";
      cell.classList.remove("disabled");
    }

    document.querySelector(".msg").textContent = "";

    let radioButtons = document.getElementsByName("game");
    for (let r of radioButtons) {
      r.checked = false;
    }

    player = null;
    gameOver = false;
    remainingCells = 0; 
    playerType = false;
  }
    
  resetGame();
  
