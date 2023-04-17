import React from "react";

const EmployerList = ({ employer, deleteEmployer }) => {
  return (
    <div className="employers">
      <img
        src={`https://ui-avatars.com/api/?name=${employer.name}&background=random&rounded=true`}
        alt=""
      />
      <p>{employer.name}</p>
      <button onClick={() => deleteEmployer(employer.id)}>Remove</button>
    </div>
  );
};

export default EmployerList;
