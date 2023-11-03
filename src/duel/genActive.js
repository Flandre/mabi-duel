function generateCombinations() {
  const ps = ['A', 'S', 'D', 'W']
  const out = []
  ps.forEach(c1 => {
    ps.forEach(c2 => {
      ps.forEach(c3 => {
        ps.forEach(c4 => {
          if(c1 == c3)
            return
          if(c2 == c4)
            return
          if(out.filter(x => (x[0] == c2 && x[1] == c1) && (x[2] == c4 && x[3] == c3)).length) {
            return
          }
          out.push([c1, c2, c3, c4])
        })
      })
    })
  })
  return out
}

const validCombinations = generateCombinations();
console.log(validCombinations.map(x => x.join('\t')).join('\n'));
console.log(validCombinations.length)