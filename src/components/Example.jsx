import React, { Component } from "react";

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "Jordan Belfort",
    };
  }

  getData() {
    setTimeout(() => {
      console.log("Our data is fetched");
      this.setState({
        data: "Hello WallStreet",
      });
    }, 1000);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

export default Example;
