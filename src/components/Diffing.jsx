import React, { Component } from 'react';

import '../styles/Diffing.css';

class Dum extends Component {
  constructor(props) {
    super(props)
    console.log('Mount', this.props)
  }

  componentWillUnmount() {
    console.log('Unmount', this.props)
  }

  render() {
    return (
      <div>{ this.props.fl }</div>
    )
  }
}

export default class Diffing extends Component {
  state = {
    fl: 0,
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({ fl: this.state.fl + 1 })
    }, 5000)
  }

  render() {
    const { fl } = this.state

    const tes = fl % 4 === 0 ? (
      <h1>
        <Dum { ...this.state } />
      </h1>
    ) : (
      <h2>
        <Dum { ...this.state }/>
      </h2>
    )

    return (
      <div className="diffing">
        <div className="diffing__section">
          <h2>By Type</h2>
          <div>
            { tes } <br />
            See Console for above changes
          </div>
          <hr />
          <div>
            <pre>
&lt;div className="default" title="stuff" /&gt; <br/>
&lt;div className="change" title="stuff" /&gt;
      </pre>
          </div>
        </div>

        <div className="diffing__section">
          <h2>By Key</h2>
          <div>
            <ul>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="https://reactjs.org/redirect-to-codepen/reconciliation/index-used-as-key"
                  target="_blank"
                >
                  Use Index
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="https://reactjs.org/redirect-to-codepen/reconciliation/no-index-used-as-key"
                  target="_blank"
                >
                  No Use Index
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
