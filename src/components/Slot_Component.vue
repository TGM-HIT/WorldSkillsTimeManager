<template>
  <div class="blackjack-container" style="margin-top: 5%;">
    <h1>Black Jack</h1>
    <div class="balance">Money: {{ balance }}$</div>
    <div v-if="!betPlaced" class="bet-section">
      <h2>Place a Bet</h2>
      <input type="number" v-model.number="bet" min="1" :max="balance" class="bet-input" />
      <button @click="placeBet" class="btn">Place bet</button>
    </div>
    <div v-else>
      <div class="card-section">
        <div class="player">
          <h2>Your Cards ({{ playerScore }})</h2>
          <div class="cards">
            <span v-for="card in playerCards" :key="card" class="card">{{ card }}</span>
          </div>
        </div>
        <div class="dealer">
          <h2>Dealers Cards ({{ dealerRevealed ? dealerScore : '?' }})</h2>
          <div class="cards">
            <span v-for="(card, index) in dealerCards" :key="card" class="card">
              {{ dealerRevealed || index === 0 ? card : '?' }}
            </span>
          </div>
        </div>
      </div>
      <div class="controls">
        <button @click="hit" :disabled="gameOver" class="btn">Draw</button>
        <button @click="stand" :disabled="gameOver" class="btn">Stay</button>
      </div>
      <div v-if="gameOver" class="result">
        <h2>{{ resultMessage }}</h2>
        <button @click="restartGame" class="btn">New Game</button>
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
      dealerCards: [],
      gameOver: false,
      dealerRevealed: false,
      resultMessage: '',
      balance: 100,
      bet: 10,
      betPlaced: false,
    };
  },
  computed: {
    playerScore() {
      return this.calculateScore(this.playerCards);
    },
    dealerScore() {
      return this.calculateScore(this.dealerCards);
    },
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
      this.dealerCards = [this.drawCard(), this.drawCard()];
    },
    drawCard() {
      return this.deck.pop();
    },
    calculateScore(cards) {
      let score = 0;
      let aces = 0;
      cards.forEach(card => {
        let value = card.slice(0, -1);
        if (['J', 'Q', 'K'].includes(value)) {
          score += 10;
        } else if (value === 'A') {
          aces += 1;
          score += 11;
        } else {
          score += parseInt(value);
        }
      });
      while (score > 21 && aces) {
        score -= 10;
        aces -= 1;
      }
      return score;
    },
    hit() {
      this.playerCards.push(this.drawCard());
      if (this.playerScore > 21) {
        this.gameOver = true;
        this.dealerRevealed = true;
        this.resultMessage = 'You have lost!';
      }
    },
    stand() {
      this.dealerRevealed = true;
      while (this.dealerScore < 17) {
        this.dealerCards.push(this.drawCard());
      }
      this.gameOver = true;
      if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
        this.resultMessage = 'You have won!';
        this.balance += this.bet * 2;
      } else if (this.playerScore < this.dealerScore) {
        this.resultMessage = 'The Dealer won!';
      } else {
        this.resultMessage = 'Tie!';
        this.balance += this.bet;
      }
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
      this.dealerRevealed = false;
      this.resultMessage = '';
      this.betPlaced = false;
      this.playerCards = [];
      this.dealerCards = [];
    }
  },
  created() {
    this.initializeDeck();
  }
};
</script>

<style scoped>
.blackjack-container {
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