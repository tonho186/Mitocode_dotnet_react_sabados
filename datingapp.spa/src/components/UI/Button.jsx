import React from "react";

const button = props => {
  let btnClass = "btn";

  return (
    <button
      className={[btnClass, props.bsClasses].join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
