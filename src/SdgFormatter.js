import React from "react";
import { Chip } from "@material-ui/core";
import sdg from "./sdg";

const SdgFormatter = (props) => {
  return (
    <>
      {props.row.sdg?.map((x) => (
        <Chip
          style={{ marginRight: "8px" }}
          size="small"
          label={sdg.find((el) => el.id === x)?.value}
        />
      ))}
    </>
  );
};

export default SdgFormatter;
