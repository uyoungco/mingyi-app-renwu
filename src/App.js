import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Home from './page/home'
import store from './store'

import './normalize.min.css'
import './app.less'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;

// 兼容vw
window.onload = function () {
  window.viewportUnitsBuggyfill.init({
    hacks: window.viewportUnitsBuggyfillHacks
  });
}