import React from 'react';
import Table from './Table';
import CellValueField from './CellValueField';
import ErrorBoundary from '../utils/ErrorBoundary';

class App extends React.PureComponent {
  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <Table />
        </div>
      </ErrorBoundary>
    );
  }
}
export default App;
