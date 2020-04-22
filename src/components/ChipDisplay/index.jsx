import React from "react";
import Chip from "@material-ui/core/Chip";

const ChipDisplay = ({ data, deleteFunction }) => {
  return (
    <>
      {!!data.length &&
        data.map((item) => (
          <div style={{ margin: "5px 3px" }} key={item.name ? item.name : item}>
            <Chip
              label={item.name ? item.name : item}
              onDelete={deleteFunction && (() => deleteFunction(item, data))}
              className="ingredientChip"
              color={item.isMissing ? "secondary" : "primary"}
            />
          </div>
        ))}
    </>
  );
};
export default ChipDisplay;
//<ChipDisplay data={ingredients} deleteFunction={removeIngredient} />;
