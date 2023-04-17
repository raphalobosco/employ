import React from "react";

const EmployerList = ({ employer, deleteEmployer }) => {
  return (
    <div>
      <p>{employer.name}</p>
      <button onClick={() => deleteEmployer(employer.id)}>Remove</button>
    </div>
  );
};

export default EmployerList;
