import React, { Component } from "react";
import { Chart, Geom, Tooltip, Coord, Legend } from "bizcharts";

class Pie extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          {
            year: "2001",
            population: 41.8
          },
          {
            year: "2002",
            population: 38
          },
          {
            year: "2003",
            population: 33.7
          },
          {
            year: "2004",
            population: 30.7
          },
          {
            year: "2005",
            population: 25.8
          },
          {
            year: "2006",
            population: 31.7
          },
          {
            year: "2007",
            population: 33
          },
          {
            year: "2008",
            population: 46
          },
          {
            year: "2009",
            population: 38.3
          },
          {
            year: "2010",
            population: 28
          },
          {
            year: "2011",
            population: 42.5
          },
          {
            year: "2012",
            population: 30.3
          }
        ]
      });
    }, 1000);
  }

  render() {
    const { data } = this.state;

    return (
      <Chart height={300} data={data} padding="auto" forceFit>
        <Coord type="polar" />
        <Tooltip />
        <Legend
          position="right"
          offsetY={-window.innerHeight / 2 + 180}
          offsetX={-160}
        />
        <Geom
          type="interval"
          color="year"
          position="year*population"
          style={{
            lineWidth: 1,
            stroke: "#fff"
          }}
        />
      </Chart>
    );
  }
}

export default Pie;
