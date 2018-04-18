import React from 'react';
import {connect} from 'react-redux';
import {updateColumns, updateRows} from '../redux/application/actions';
import Cell from './Cell';
import CellValueField from './CellValueField';

class Table extends React.Component {
  constructor() {
    super();

    this.updateRows = ::this.updateRows;
    this.updateColumns = ::this.updateColumns;
  }

  updateRows(e) {
    this.props.updateRows(parseInt(e.target.value || 0));
  }

  updateColumns(e) {
    this.props.updateColumns(parseInt(e.target.value || 0));
  }

  render() {
    console.log(this.props);
    return (
      <div className='table'>
        <div className="input-wrapper">
          <input type="text" onChange={this.updateRows} placeholder='Rows'/>
        </div>
        <div className="input-wrapper">
          <input type="text" onChange={this.updateColumns} placeholder='Columns'/>
        </div>
        <table className={(this.props.columns > 0 && this.props.rows.length > 0) ? 'visible' : 'hidden'}>
          <thead>
          <tr>
            <td colSpan={this.props.columns}>
              <CellValueField/>
            </td>
          </tr>
          </thead>
          <tbody>
          {this.props.rows.map((el, row) => {
            return (<tr key={row}>
              {el.map((item, col) => {
                return (
                  <Cell
                    value={item.value}
                    id={item.id}
                    key={col}
                    row={row}
                    column={col}
                    isSelected={this.props.selectedCell === item.id}
                  />
                );
              })}
            </tr>);
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect((state => {
  return {
    rows: state.application.cells.getRows(),
    columns: state.application.cells.columns,
    selectedCell: state.application.selectedCell,
  };
}), { updateColumns, updateRows })(Table);

