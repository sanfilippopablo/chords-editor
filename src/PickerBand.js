import React from 'react'
import { Motion, spring, presets } from 'react-motion'
import './PickerBand.css'

export default class PickerBand extends React.Component {
  constructor() {
    super()
    this.rootStyle = this.rootStyle.bind(this)
  }

  rootStyle () {
    return {
      left: this.props.left,
      top: this.props.top
    }
  }

  render () {
    const elements = ['A#min', 'F+9', 'C/B']
    return (
      <Motion defaultStyle={{clip: 0}} style={{clip: spring(225, presets.gentle)}}>
        {interpolatingStyles => (
          <div className="PickerBand-root" style={{WebkitClipPath: `circle(${interpolatingStyles.clip}px at left 100px)`, ...this.rootStyle()}}>
            {elements.map((element) => (
              <span key={element} className="PickerBand-element">{element}</span>
            ))}
          </div>
        )}
      </Motion>
    )
  }
}
