const teamName = document.getElementById("team");
const typeOfSport = document.getElementById("sport");
const worldCupYear = document.getElementById("year");
const headCoach = document.getElementById("head-coach");
const playerCards = document.getElementById("player-cards");
const playersDropdownList = document.getElementById("players");
const searchInputEle = document.querySelector("[data-search-input]");

(async () => {
  const jsonData = await fetch("indian-cricket-players-data.json");
  const myFavoriteCricketTeam = await jsonData.json();

  Object.freeze(myFavoriteCricketTeam);

  const { sport, team, year, players, headCoachName } = myFavoriteCricketTeam;
  teamName.textContent = team;
  typeOfSport.textContent = sport;
  worldCupYear.textContent = year;
  headCoach.textContent = headCoachName;

  function getBackgoundImage() {
    const allPlayerCards = Array.from(
      document.querySelectorAll(".player-card")
    );


    (async () => {
      let data = await fetch("image.json");
      let arr = await data.json();
      return arr;
    })().then((response) => {
      let i = 0;
      response.forEach((res) => {
        if (i < allPlayerCards.length && i < response.length) {
          allPlayerCards[
            i
          ].style.backgroundImage = `linear-gradient( #000000c5, #000000d9 ), url(${res})`;
        }
        i++;
      });
    });
  }



  const setPlayerCards = (arr = players) => {
    playerCards.innerHTML += arr
      .map(({ name, number, playerType, age, hand }) => {
        return `
          <div class="player-card">
          <h2>${name}</h2>
          <p>Type of Player: ${playerType}</p>
          <p>Number: ${number}</p>
          <p>Age: ${age}</p>
          <p>${hand}</p>
      </div>
          `;
      })
      .join("");
  };
  playerCards.innerHTML ="";
  setPlayerCards();
  getBackgoundImage();

  playersDropdownList.addEventListener("change", (e) => {
    playerCards.innerHTML = "";
    switch (e.target.value) {
      case "age":
        setPlayerCards(players.sort((player1, player2) => player1.age - player2.age));
        break;
      case "batter":
        setPlayerCards(
          players.filter((player) => player.playerType == "Batter")
        );
        break;
      case "bowler":
        setPlayerCards(
          players.filter((player) => player.playerType == "Bowler")
        );
        break;
      case "all-rounder":
        setPlayerCards(
          players.filter((player) => player.playerType == "All Rounder")
        );
        break;
      case "wicket-keeper":
        setPlayerCards(
          players.filter((player) => player.playerType == "Wicket Keeper")
        );
        break;

      default:
        setPlayerCards();
        break;
    }

    getBackgoundImage();
  });

  searchInputEle.addEventListener("input", (e) => {
    const value = (e.target.value).toLowerCase();
    playerCards.innerHTML = "";
    setPlayerCards(players.filter((player) => (player.name).toLowerCase().includes(value)));
    getBackgoundImage();
  });
})();
