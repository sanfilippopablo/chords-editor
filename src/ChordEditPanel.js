import React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import './ChordEditPanel.css'

class ChordEditPanel extends React.Component {
  constructor () {
    super()
    this.selectChar = this.selectChar.bind(this)
    this.isSelectedChar = this.isSelectedChar.bind(this)
  }

  selectChar (verseIndex, lineIndex, bitIndex, charIndex) {
    this.props.dispatch({
      type: 'SELECT_CHAR',
      selectedChar: {
        verseIndex,
        lineIndex,
        bitIndex,
        charIndex
      }
    })
  }

  isSelectedChar (verseIndex, lineIndex, bitIndex,  charIndex) {
    const { selectedChar } = this.props
    if (!selectedChar) return false
    return verseIndex === selectedChar.verseIndex
    && lineIndex === selectedChar.lineIndex
    && bitIndex === selectedChar.bitIndex
    && charIndex === selectedChar.charIndex
  }

  render () {
    return (
      <div>
        {this.props.objectLyrics.verses.map((verse, verseIndex) => (
          <div className='verse' key={verse.name}>
            <h3>{verse.name}</h3>
            <div className="lines">
              {verse.lines.map((line, lineIndex) => (
                <div className='line' key={lineIndex}>
                  {line.map((bit, bitIndex) => (
                    <span className='bit' key={bitIndex}>
                      <span className='chord'>{bit.chord}</span>
                      {bit.text.split('').map((char, charIndex) => (
                        <span
                          className={cn('char', {'selected': this.isSelectedChar(verseIndex, lineIndex, bitIndex, charIndex)})}
                          key={charIndex}
                          onClick={() => this.selectChar(verseIndex, lineIndex, bitIndex, charIndex)}
                        >{char}</span>
                        ))}
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
  (state) => state
)(ChordEditPanel)
