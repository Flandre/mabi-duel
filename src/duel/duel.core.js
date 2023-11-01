class duel {
  constructor(player_1_Race, player_2_Race) {
    this.player_1 = {
      race: player_1_Race, //Human, Elf, Titan
      HP: 100,
      skillPoints: 5,
      commandHistory: [],
      skills: this.initSkill()
    }
    this.player_2 = {
      race: player_2_Race, //Human, Elf, Titan
      HP: 100,
      COST: 5,
      commandHistory: [],
      skills: this.initSkill()
    }
    this.commands = {
      'A': {
        defeats: new Set(['W', 'D']),
        ATK: 18
      },
      'W': {
        defeats: new Set(['D']),
        ATK: 22
      },
      'D': {
        defeats: new Set(['S']),
        ATK: 30
      },
      'S': {
        defeats: new Set(['A']),
        ATK: 26
      }
    }
  }
  initSkill() {
    return [
      {
        skillName: 'none',
        COST: '0',
        rule: [],
        available: true,
        changed: false
      },
      {
        skillName: 'swack',
        COST: '3',
        rule: [],
        available: true,
        changed: true
      },
      {
        skillName: 'counter',
        COST: '3',
        rule: [],
        available: true,
        changed: true
      },
      {
        skillName: 'attentive',
        COST: '3',
        rule: [],
        available: true,
        changed: true
      },
      {
        skillName: 'block',
        COST: '2',
        rule: [],
        available: true,
        changed: true
      }
    ]
  }
  randomCommand(playerCommandHistory) {
    let availableCommand = Object.keys(this.commands).filter(x => x !== playerCommandHistory[playerCommandHistory.length - 1])
    return availableCommand[~~(availableCommand.length * Math.random())]
  }
  active(player_1_input, player_2_input) {
    let [player_1_command, player_1_skill] = player_1_input.toUpperCase().split('')
    let [player_2_command, player_2_skill] = player_2_input.toUpperCase().split('')
    // 检查是否使用上次使用过的指令
    if(player_1_command === this.player_1.commandHistory[this.player_1.commandHistory.length - 1]) {
      player_1_command = this.randomCommand(this.player_1.commandHistory)
    }
    if(player_2_command === this.player_2.commandHistory[this.player_2.commandHistory.length - 1]) {
      player_2_command = this.randomCommand(this.player_2.commandHistory)
    }
    // 检查是否可使用技能
    if(this.player_1.skills[player_1_skill]?.available && this.player_1.skills[player_1_skill]?.COST >= this.player_1.COST){
      if(this.player_1.skills[player_1_skill]?.changed) {
        this.player_1.skills[player_1_skill].available = false
        this.player_1.COST -= this.player_1.skills[player_1_skill].COST
      }
    } else {
      player_1_skill = '0'
    }
    if(this.player_2.skills[player_2_skill]?.available && this.player_2.skills[player_2_skill]?.COST >= this.player_2.COST){
      if(this.player_2.skills[player_2_skill]?.changed) {
        this.player_2.skills[player_2_skill].available = false
        this.player_2.COST -= this.player_2.skills[player_2_skill].COST
      }
    } else {
      player_2_skill = '0'
    }
    // 比较指令
    let output = {
      player_1: {
        command: player_1_command,
        skill: player_1_skill,
        result: 'draw',
        damage: this.commands[player_2_command].ATK,
        rate: 1
      },
      player_2: {
        command: player_2_command,
        skill: player_2_skill,
        result: 'draw',
        damage: this.commands[player_1_command].ATK,
        rate: 1
      },
      winner: '',
      loser: ''
    }
    output = this.judgeCommand(output)
    output = this.checkRaceSkill(output)
  }
  judgeCommand(output) {
    if(this.commands[output.player_1.command].defeats.has(output.player_2.command)) {
      output.player_1.result = 'win'
      output.player_2.result = 'lose'
      output.player_1.damage = 0
      output.winner = 'player_1'
      output.loser = 'player_2'
    }
    if(this.commands[output.player_2.command].defeats.has(output.player_1.command)) {
      output.player_1.result = 'lose'
      output.player_2.result = 'win'
      output.player_2.damage = 0
      output.winner = 'player_2'
      output.loser = 'player_1'
    }
    return output
  }
  checkRaceSkill(output) {
    if(output.winner) {
      let { winner, loser } = output
      switch(winner.race) {
        case 'Human':
          if(output[winner].command === 'W' && this[winner].commandHistory[this[winner].commandHistory.length - 1] === 'A') {
            output[loser].rate *= 1.5
          }
          break
        case 'Elf':
          if(output[winner].command === 'S' && this[winner].commandHistory[this[winner].commandHistory.length - 1] === this[loser].commandHistory[this[loser].commandHistory.length - 1] && this[winner].commandHistory[this[winner].commandHistory.length - 1]) {
            output[loser].rate *= 1.5
          }
          break
        case 'Titan':
          if(output[winner].command === 'S' && this[winner].commandHistory[this[winner].commandHistory.length - 1] === 'W') {
            output[loser].rate *= 1.5
          }
          break
      }
      output[output.winner].command
    } else {
      return output
    }
  }
  judgeSkill(output) {
    if(output[output.loser].skill === '4') {
      this[output.winner].COST ++
      output[output.loser].rate = 0
      return output
    }
    if(output[output.winner].skill === '4') {
      return output
    }
    if(output[output.loser].skill === '2') {
      let winnerTmp = Object.assign({}, output[output.winner])
      output[output.winner].damage = output[output.loser].damage
      output[output.winner].rate = output[output.loser].rate
      output[output.winner].result = output[output.loser].result
      output[output.loser].damage = winnerTmp.damage
      output[output.loser].rate = winnerTmp.rate * 1.1
      output[output.loser].result = winnerTmp.result
      winnerTmp = output.winner
      output.winner = output.loser
      output.loser = winnerTmp
      return output
    }
    if(output[output.winner].skill === '1') {
      output[output.loser].rate *= 2
      return output
    }
    if(!output.winner && !output.loser) {
      if(output.player_1.skill === '3') {
        output.player_2.rate *= 1.2
      }
      if(output.player_2.skill === '3') {
        output.player_1.rate *= 1.2
      }
      return output
    }
    return output
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = duel
}

// ES6 导出
if (typeof exports !== 'undefined') {
  exports.default = duel
}