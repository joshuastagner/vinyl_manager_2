import React from 'react';
import RecordView from './RecordView.jsx';
const List = (props) => {
  if (props.filter === 'ADD_RECORD') {
    return null;
  }

  return (
    <div>
      {props.records.map(record => <RecordView key={record.record_id} record={record}/>)}
    </div>
  );
}

export default List;
