import React, {Component, PropTypes} from "react";
import {Modal} from 'react-bootstrap'


export function asNumber(value) {
  if (value === "") {
    return undefined;
  }
  if (/\.$/.test(value)) {
    // "3." can't really be considered a number even if it parses in js. The
    // user is most likely entering a float.
    return value;
  }
  if (/\.0$/.test(value)) {
    // we need to return this as a string here, to allow for input like 3.07
    return value;
  }
  const n = Number(value);
  const valid = typeof n === "number" && !Number.isNaN(n);

  if (/\.\d*0$/.test(value)) {
    // It's a number, that's cool - but we need it as a string so it doesn't screw
    // with the user when entering dollar amounts or other values (such as those with
    // specific precision or number of significant digits)
    return value;
  }

  return valid ? n : value;
}


class ToggledSubformWidget extends Component {
    state = {
      show: false
    }
    render() {
        let close = () => this.setState({show: false})
        const display = this.props.children.props.formData.display
        return (
            <div className="modal-field toggled-subform">
                <div className="modal-container" style={{height: 100}}>
                    <label>{this.props.label}</label>
                    {display ? <label>:{display}</label> : ''}
                    <span id={this.props.id + '_toggle'} onClick={() => this.setState({show: true})}>Edit</span>
                    <Modal
                        show={this.state.show}
                        onHide={close}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            { this.props.children }
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

ToggledSubformWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    // ToggledSubformWidget.propTypes = {
    //     schema: PropTypes.object.isRequired,
    //     id: PropTypes.string.isRequired,
    //     value: PropTypes.any,
    //     required: PropTypes.bool,
    //     multiple: PropTypes.bool,
    //     autofocus: PropTypes.bool,
    //     onChange: PropTypes.func,
    //     component: PropTypes.func,
    //     formToDoc: PropTypes.func,
    //     docToForm: PropTypes.func
    // };
}

export default ToggledSubformWidget;
