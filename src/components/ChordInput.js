import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../redux'
import './ChordInput.css'

class ChordInput extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.addChord()
  }

  handleChange (e) {
    this.props.updateChordInput(e.target.value)
  }

  componentDidMount () {
    this.refs.input.focus()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' ref='input' className='ChordInput' value={this.props.chordInput} onChange={this.handleChange} />
      </form>
    )
  }
}

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(ChordInput)
