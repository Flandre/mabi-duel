function generateCombinations() {
  const player1Cards = ['A', 'S', 'D', 'W'];
  const player2Cards = ['A', 'S', 'D', 'W'];
  const combinations = [];

  for (let round1Player1 = 0; round1Player1 < player1Cards.length; round1Player1++) {
    for (let round1Player2 = 0; round1Player2 < player2Cards.length; round1Player2++) {
      if (player1Cards[round1Player1] !== player2Cards[round1Player2]) {
        for (let round2Player1 = 0; round2Player1 < player1Cards.length; round2Player1++) {
          if (player1Cards[round2Player1] !== player1Cards[round1Player1]) {
            for (let round2Player2 = 0; round2Player2 < player2Cards.length; round2Player2++) {
              if (round1Player1 !== round2Player1 && round1Player2 !== round2Player2) {
                const combo = `${player1Cards[round1Player1]}\t${player2Cards[round1Player2]}\n${player1Cards[round2Player1]}\t${player2Cards[round2Player2]}`;
                combinations.push(combo);
              }
            }
          }
        }
      }
    }
  }

  return combinations;
}

const validCombinations = generateCombinations();
console.log(validCombinations.join('\n\n'));