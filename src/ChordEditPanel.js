import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './redux'
import ChordInput from './components/ChordInput'

import './ChordEditPanel.css'

class ChordEditPanel extends React.Component {
  constructor () {
    super()
    this.isSelectedChar = this.isSelectedChar.bind(this)
  }

  isSelectedChar (verseIndex, lineIndex, bitIndex, charIndex) {
    const { selectedChar } = this.props
    if (!selectedChar) return false
    return verseIndex === selectedChar.verseIndex
    && lineIndex === selectedChar.lineIndex
    && bitIndex === selectedChar.bitIndex
    && charIndex === selectedChar.charIndex
  }

  render () {
    return (
      <div className="ChordEditPanel-root">
        {this.props.objectLyrics.verses.map((verse, verseIndex) => (
          <div className='verse' key={verse.name}>
            <h3>{verse.name}</h3>
            <div className="lines">
              {verse.lines.map((line, lineIndex) => (
                <div className='line' key={lineIndex}>
                  {line.map((bit, bitIndex) => (
                    <span className='bit' key={bitIndex}>
                      <span className='chord'>{bit.chord}</span>
                      {bit.text.split('').map((char, charIndex) => {
                        if (this.isSelectedChar(verseIndex, lineIndex, bitIndex, charIndex)) {
                          return (
                            <span className='char selected' key={charIndex}>
                              <span className='chord-input-wrapper'>
                                <ChordInput />
                              </span>
                              <span>
                                {char}
                              </span>
                            </span>
                          )
                        } else {
                          return (
                            <span
                              className='char'
                              key={charIndex}
                              onClick={() => this.props.selectChar(verseIndex, lineIndex, bitIndex, charIndex)}
                            >{char}</span>
                          )
                        }
                      })}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => state,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ChordEditPanel)
