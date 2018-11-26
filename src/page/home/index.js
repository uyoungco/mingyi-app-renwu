import React, { Component } from 'react'
import { connect } from 'react-redux'


import { actionCreators } from './store'
import SignIn from './components/signIn'
import Task from './components/task'
import './style.less'

import { parseURL } from '../../utils/utils'


class Home extends Component {
  componentDidMount() {
    const parameter = parseURL(window.location.href).params
    this.props.getInitContent(parameter.token, parameter.type)
  }
  render() {
    return (
      <div className="home">
        <SignIn />
        <Task />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getInitContent(token, type) {
    dispatch(actionCreators.initContent(token, type))
  }
})

export default connect(null, mapDispatch)(Home)