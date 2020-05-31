import React from "react";
import Chip from "@material-ui/core/Chip";

const ChipDisplay = ({ data, deleteFunction }) => {
  return (
    <>
      {!!data &&
        !!data.length &&
        data.map((item, index) => (
          <div style={{ margin: "5px 3px" }} key={index}>
            <Chip
              label={item.name ? item.name : item}
              onDelete={deleteFunction && (() => deleteFunction(item))}
              className="ingredientChip"
              color={!item.isMissing ? "primary" : "secondary"}
            />
          </div>
        ))}
    </>
  );
};
export default ChipDisplay;
//<ChipDisplay data={ingredients} deleteFunction={removeIngredient} />;
