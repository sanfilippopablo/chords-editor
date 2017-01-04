import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './redux'
import './TextInputPanel.css'

class TextInputPanel extends React.Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.updateTextarea(e.target.value)
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
      </div>
    )
  }
}

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(TextInputPanel)
