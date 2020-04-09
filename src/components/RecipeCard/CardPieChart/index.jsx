import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class CardPieChart extends React.Component {
  state = {
    dataPie: {
      labels: ["Need", "Have"],
      datasets: [
        {
          data: [this.props.missedIngredients, this.props.usedIngredients],
          backgroundColor: ["#FA8BA2", "#46BFBD"],
          hoverBackgroundColor: ["#FDDAE1", "#5AD3D1"],
        },
      ],
    },
  };

  render() {
    return (
      <MDBContainer>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default CardPieChart;
