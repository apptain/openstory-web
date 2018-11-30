import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import 'tinymce';
import TinyMCE from 'react-tinymce';
//const TinyMCE = eval("require('tinymce')");

import 'tinymce/themes/modern/theme';
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/lists/plugin';
import 'tinymce/plugins/print/plugin';
import 'tinymce/plugins/preview/plugin';

export default class tinymceWidget extends Component {
    getInitState() {
        this.currentValue = this.props.value
        return {
            value: this.props.value
        }
    }
    render() {
        //this is hacky, but the onChange event in react-tinymce isn't firing after initial change
        const that = this;
        const onChange = (event) => {

          const wysi = event.target
          const thatDouble = that
          event.target.on("keyup", () => {
              const value = wysi.getContent()
              if(thatDouble.props.onChange) {
                  thatDouble.props.onChange(value)
              }
          })
          const value = wysi.getContent()
          if(that.props.onChange) {
              that.props.onChange(value)
          }
        }
        return (
          <div>
            <TinyMCE
                id={this.props.id}
                className={this.props.id}
                onChange={onChange}
                content={this.props.value}
                config={{
                    branding: false,
                    menubar: false,
                    preview_styles: 'font-size color',
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'styleselect | bullist numlist | bold italic',
                    statusbar: false
                }}
            />
          </div>
        )
    }
}
