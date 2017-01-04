import React, { Component } from 'react'
import { connect } from 'react-redux'

class ChordInput extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.dispatch({type: 'ADD_CHORD'})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.props.chordInput} onChange={(e) => this.props.dispatch({type: 'UPDATE_CHORD_INPUT', value: e.target.value})} />
      </form>
    )
  }
}

export default connect(
  (state) => state
)(ChordInput)
