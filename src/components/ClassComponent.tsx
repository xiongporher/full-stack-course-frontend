"use client";

import React, { Component } from "react";
class ClassComponent extends Component<{ message: string }> {
  render() {
    return <h1 className="example-global-css">{this.props.message}</h1>;
  }
}

export default ClassComponent;
