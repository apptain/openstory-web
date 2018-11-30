import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

export default class AceWidget extends Component {
  getInitState() {
    this.currentValue = this.props.value
    return {
      value: this.props.value
    }
  }

  render() {
    const that = this;
    const onChange = (value) => {
      debugger;
      // const wysi = event.target
      // const thatDouble = that
      //f event.target.on("keyup", () => {
      //   const value = wysi.getContent()
      //   if(thatDouble.props.onChange) {
      //     thatDouble.props.onChange(value)
      //   }
      // })
      // const value = wysi.getContent()
      if(that.props.onChange) {
        that.props.onChange(value)
      }
    }

    return (
      <AceEditor
        mode="java"
        theme="github"
        onChange={onChange}
        value={this.props.value}
        editorProps={{$blockScrolling: true}}
      />
    )
  }
}
