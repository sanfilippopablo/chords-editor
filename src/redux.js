import ChordsFormat from 'chords-format'
import _ from 'lodash'

const initialState = {
  objectLyrics: {
    verses: []
  },
  textareaLyrics: '',
  sync: true,
  error: null,
  selectedChar: null,
  chordInput: ''
}

const chordsFormat = new ChordsFormat()

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TEXTAREA':
      try {
        return {
          ...state,
          textareaLyrics: action.value,
          objectLyrics: chordsFormat.parse(action.value),
          sync: true,
          error: null
        }
      } catch (e) {
        return {
          ...state,
          textareaLyrics: action.value,
          sync: false,
          error: e
        }
      }
    case 'SELECT_CHAR':
      let sc = action.selectedChar
      let chordInput = state.chordInput
      if (sc.charIndex === 0) {
        // We are selecting a char that already has a chord.
        chordInput = state.objectLyrics.verses[sc.verseIndex].lines[sc.lineIndex][sc.bitIndex].chord
      }
      return {
        ...state,
        selectedChar: action.selectedChar,
        chordInput
      }
    case 'UPDATE_CHORD_INPUT':
      return {
        ...state,
        chordInput: action.value
      }
    case 'ADD_CHORD':
      const { verseIndex, lineIndex, bitIndex, charIndex } = state.selectedChar
      const objectLyrics = _.cloneDeep(state.objectLyrics)
      if (charIndex === 0) {
        // We are asigning a chord to the first char of a bit. This means
        // that we are replacing the chord of that bit and don't need to
        // do any splitting.
        objectLyrics.verses[verseIndex].lines[lineIndex][bitIndex].chord = state.chordInput
      } else {
        // The chord is in the middle of a bit. We have to split the bit.
        let line = objectLyrics.verses[verseIndex].lines[lineIndex]
        objectLyrics.verses[verseIndex].lines[lineIndex] = [
          ...line.slice(0, bitIndex),
          {
            chord: line[bitIndex].chord,
            text: line[bitIndex].text.slice(0, charIndex)
          },
          {
            chord: state.chordInput,
            text: line[bitIndex].text.slice(charIndex)
          },
          ...line.slice(bitIndex + 1)
        ]
      }
      return {
        ...state,
        objectLyrics,
        textareaLyrics: chordsFormat.stringify(objectLyrics),
        selectedChar: null,
        chordInput: ''
      }
    default:
      return state
  }
}
