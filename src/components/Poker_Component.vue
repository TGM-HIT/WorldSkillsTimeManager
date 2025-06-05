<template>
    <div class="poker-container">
      <h1>Texas Hold'em Poker</h1>
      <div class="balance">Guthaben: {{ balance }}$</div>
      <div v-if="!betPlaced" class="bet-section">
        <h2>Setze deinen Einsatz</h2>
        <input type="number" v-model.number="bet" min="1" :max="balance" class="bet-input" />
        <button @click="placeBet" class="btn">Einsatz setzen</button>
      </div>
      <div v-else>
        <div class="card-section">
          <div class="player">
            <h2>Deine Karten</h2>
            <div class="cards">
              <span v-for="card in playerCards" :key="card" class="card">{{ card }}</span>
            </div>
          </div>
          <div class="table">
            <h2>Gemeinschaftskarten</h2>
            <div class="cards">
              <span v-for="card in communityCards" :key="card" class="card">{{ card }}</span>
            </div>
          </div>
          <div class="opponents">
            <h2>Gegner</h2>
            <div v-for="(opponent, index) in opponents" :key="index" class="opponent">
              <h3>{{ opponent.name }}</h3>
              <div class="cards">
                <span v-if="gameOver" v-for="card in opponent.cards" :key="card" class="card">{{ card }}</span>
                <span v-else class="card">?</span>
              </div>
            </div>
          </div>
        </div>
        <div class="controls">
          <button @click="dealFlop" v-if="phase === 'preflop'" class="btn">Flop</button>
          <button @click="dealTurn" v-if="phase === 'flop'" class="btn">Turn</button>
          <button @click="dealRiver" v-if="phase === 'turn'" class="btn">River</button>
          <button @click="showdown" v-if="phase === 'river'" class="btn">Showdown</button>
        </div>
        <div v-if="gameOver" class="result">
          <h2>{{ resultMessage }}</h2>
          <button @click="restartGame" class="btn">Neues Spiel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        deck: [],
        playerCards: [],
        communityCards: [],
        opponents: [],
        phase: 'preflop',
        gameOver: false,
        resultMessage: '',
        balance: 100,
        bet: 10,
        betPlaced: false,
      };
    },
    methods: {
      initializeDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = suits.flatMap(suit => values.map(value => `${value}${suit}`));
        this.deck.sort(() => Math.random() - 0.5);
      },
      dealCards() {
        this.playerCards = [this.drawCard(), this.drawCard()];
        this.opponents = [
          { name: 'Spieler 1', cards: [this.drawCard(), this.drawCard()] },
          { name: 'Spieler 2', cards: [this.drawCard(), this.drawCard()] }
        ];
      },
      drawCard() {
        return this.deck.pop();
      },
      dealFlop() {
        this.communityCards.push(this.drawCard(), this.drawCard(), this.drawCard());
        this.phase = 'flop';
      },
      dealTurn() {
        this.communityCards.push(this.drawCard());
        this.phase = 'turn';
      },
      dealRiver() {
        this.communityCards.push(this.drawCard());
        this.phase = 'river';
      },
      showdown() {
        this.gameOver = true;
        this.resultMessage = 'Showdown beendet!';
      },
      placeBet() {
        if (this.bet > 0 && this.bet <= this.balance) {
          this.balance -= this.bet;
          this.betPlaced = true;
          this.initializeDeck();
          this.dealCards();
        }
      },
      restartGame() {
        this.gameOver = false;
        this.resultMessage = '';
        this.betPlaced = false;
        this.playerCards = [];
        this.communityCards = [];
        this.opponents = [];
        this.phase = 'preflop';
      }
    },
    created() {
      this.initializeDeck();
    }
  };
  </script>
  
  <style scoped>
  .poker-container {
    text-align: center;
    font-family: Arial, sans-serif;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 2px solid #333;
    border-radius: 10px;
    background-color: #2e7d32;
    color: white;
  }
  .card-section {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  .opponents {
    margin-top: 20px;
  }
  .opponent {
    margin-bottom: 10px;
  }
  .cards {
    display: flex;
    gap: 10px;
  }
  .card {
    display: inline-block;
    background: white;
    color: black;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
  .controls {
    margin-top: 20px;
  }
  .btn {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background: #ffc107;
    border: none;
    border-radius: 5px;
    color: black;
    font-weight: bold;
  }
  .btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  .result {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
  }
  .bet-section {
    margin-bottom: 20px;
  }
  .bet-input {
    padding: 5px;
    font-size: 16px;
    margin-right: 10px;
  }
  .balance {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>