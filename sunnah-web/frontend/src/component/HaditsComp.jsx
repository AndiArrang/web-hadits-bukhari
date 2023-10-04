
import React from "react";
function HaditsComp(props) {
//  console.log(props)
  return (
    <React.Fragment>
    <div className="card card-hadits">
    <div className="card-header ">
        Nomor hadits : <strong>{props.data.No}</strong>
    </div>
    <div className="card-body bg-primary-subtle">
      <p className="card-text arab">{props.data.Arab}</p>
      <hr />
      <p className="card-text terjemah">{props.data.Terjemah}</p>
    </div>
  </div>
  </React.Fragment>
  );
}

export default HaditsComp;