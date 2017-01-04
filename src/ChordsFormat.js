export const stringify = (lyrics) => lyrics.verses.map((verse) => {
  return `---[${verse.name}]---\n` + verse.lines.map((line) => {
    let innerText = line.map((bit) => {
      let s = ''
      if (bit.chord) {
        s += `{c}[${bit.chord}]{/c}`
      }
      s += bit.text
      return s
    }).join('')
    return innerText
  }).join('\n')
}).join('\n')

const verseIsNull = (verse) => verse.name === '' && verse.lines.length === 0

export const parse = (text) => {
  const verseNameRegex = /---\[(.*?)\]---/
  const linesOfText = text.split('\n')
  const lyrics = {
    verses: []
  }
  let verse = {
    name: '',
    lines: []
  }
  linesOfText.forEach((lineOfText, textLineNumber) => {
    if (verseNameRegex.test(lineOfText)) {
      // Close last verse and add to lyrics
      if (!verseIsNull(verse)) {
        lyrics.verses.push(verse)
      }

      // Start creating the new verse
      verse = {
         name: verseNameRegex.exec(lineOfText)[1],
         lines: []
       }
    } else {
      // It's a line. Parse it
      const line = []
      let chordRegex = /\{c\}\[(.+?)\]\{\/c\}/g
      let result = chordRegex.exec(lineOfText)
      if (result === null) {
        // No chords in this line. Just one large bit.
        line.push({
          chord: null,
          text: lineOfText
        })
      }
      else if (result !== null && result.index !== 0) {
        // It doesn't start with a chord, but with text
        // So let first insert that first text
        line.push({
          chord: null,
          text: lineOfText.slice(0, result.index)
        })
      }
      while (result !== null) {
        let lastResult = result
        result = chordRegex.exec(lineOfText)
        let sliceEnd = result ? result.index : undefined
        line.push({
          chord: lastResult[1],
          text: lineOfText.slice(lastResult.index + lastResult[0].length, sliceEnd)
        })
        // if (result) {
        //   lastResult = result
        // }
      }
      verse.lines.push(line)
    }
  })
  lyrics.verses.push(verse)
  return lyrics
}

export default {
  stringify,
  parse
}
