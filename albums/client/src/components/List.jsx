import React from 'react';
import RecordView from './RecordView.jsx';
const List = (props) => {
  console.log(props)
  return (
    <div>
      {props.records.map(record => <RecordView key={record.record_id} record={record}/>)}
    </div>
  );
}

export default List;
