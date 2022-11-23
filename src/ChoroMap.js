import React, {Component} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@squisho/colored-map";

class ChoroMap extends Component {
  animationRef = React.createRef();

  componentDidMount() {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "vicmap") {
        return new Inspector(this.animationRef.current);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div ref={this.animationRef}></div>
      </div>
    );
  }
}

export default ChoroMap;