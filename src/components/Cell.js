import React from 'react';
import { connect } from 'react-redux';
import { selectCell } from '../redux/application/actions';
import cellFormatter from '../utils/dataFormatters';

class Cell extends React.Component {
  constructor() {
    super();

    this.selectCell = ::this.selectCell;
  }

  selectCell() {
    this.props.selectCell(this.props.id);
  }

  render() {
    return (
      <td className={this.props.isSelected ? 'selected' : ''} onClick={this.selectCell}>{cellFormatter(this.props.value, this.props.cells)}</td>
    );
  }
}

export default connect((state) => {
  return {
    cells: state.application.cells,
  };
}, { selectCell })(Cell);
