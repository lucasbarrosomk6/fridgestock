import React from "react";
import { Container, USPItem, Image, H1 } from "./styles";

const USP = ({ data }) => {
  return (
    <>
      <H1>What is FridgeStock?</H1>
      <br></br>
      <Container>
        {!!data &&
          !!data.length &&
          data.map((data, index) => (
            <USPItem key={index}>
              <Image img={data.image} />
              <H1>{data.title}</H1>
              <p>{data.discription}</p>
            </USPItem>
          ))}
      </Container>
    </>
  );
};
export default USP;
