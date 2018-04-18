import React from 'react';
import { connect } from 'react-redux';
import { updateValue } from '../redux/application/actions';

class CellValueField extends React.PureComponent {
  constructor() {
    super();

    this.updateValue = ::this.updateValue;
  }
  updateValue(e) {
    this.props.updateValue(e.target.value);
  }

  render() {
    return (
      <div className="value-field-container">
        <input type="text" className="value-field" value={this.props.value} onChange={this.updateValue}/>
      </div>
    );
  }
}
export default connect((state) => {
  return {
    value: state.application.cells.getValue(state.application.selectedCell),
  };
}, { updateValue })(CellValueField);
