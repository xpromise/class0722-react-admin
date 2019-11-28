import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

export default class Line extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      });
    }, 1000);
  }

  getOption = () => {
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: this.state.data,
          type: "line",
          smooth: true
        }
      ]
    };

    return option;
  };

  render() {
    return <ReactEcharts option={this.getOption()} />;
  }
}
