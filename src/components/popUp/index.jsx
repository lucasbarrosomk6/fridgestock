import React, { useState } from "react";
import Modal from "react-modal";

import { OptionContainer, Title, InputContainer } from "./styles";
import { useCallback } from "react";

Modal.setAppElement("#root");

const PopUp = ({ showModal, toggleModal, ingredient, quantity, unit }) => {
  const [value, setValue] = useState(quantity);
  return (
    <Modal
      isOpen={showModal}
      contentLabel="ingredient-popup"
      onRequestClose={() => {
        toggleModal(false);
        console.log("closed from popup");
      }}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw"
        },
        content: {
          position: "relative",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "95vw",
          maxWidth: "500px",
          height: "30%",
          maxHeight: "300px",
          padding: "0",
          zIndex: "-1"
        }
      }}
    >
      <OptionContainer style={{ borderRight: "1px solid #ccc" }}>
        <Title>Change Quantity of this ingredient</Title>
        <InputContainer>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </InputContainer>
      </OptionContainer>
      <div style={{ borderRight: "1px solid #ccc" }}></div>
      <OptionContainer></OptionContainer>
    </Modal>
  );
};
export default PopUp;
