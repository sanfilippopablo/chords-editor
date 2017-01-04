import React from 'react'
import { connect } from 'react-redux'
import './TextInputPanel.css'

class TextInputPanel extends React.Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.dispatch({
      type: 'UPDATE_TEXTAREA',
      value: e.target.value
    })
  }

  render () {
    return (
      <div className='TextInputPanel-root'>
        <textarea
          className='TextInputPanel-input'
          value={this.props.textareaLyrics}
          onChange={this.handleChange}
        />
        <div>In sync: {this.props.sync}</div>
        <div>Error: {this.props.error ? this.props.error.message : 'No error'}</div>
        <div>
          <input type='text' value={this.props.chordInput} onChange={(e) => this.props.dispatch({type: 'UPDATE_CHORD_INPUT', value: e.target.value})} />
          <button onClick={() => this.props.dispatch({type: 'ADD_CHORD'})}>Add</button>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => state
)(TextInputPanel)
