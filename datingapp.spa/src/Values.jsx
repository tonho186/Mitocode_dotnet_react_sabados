import React, { Component } from "react";
import valuesService from "./services/valuesService";

class Values extends Component {
  state = {
    values: []
  };
  async componentDidMount() {
    const { data } = await valuesService.getValues();
    console.log("Values", data);
    this.setState({ values: data });
  }
  render() {
    const { values } = this.state;
    return (
      <div>
        {values.map(value => (
          <p key={value.id}>{value.name}</p>
        ))}
      </div>
    );
  }
}
export default Values;
