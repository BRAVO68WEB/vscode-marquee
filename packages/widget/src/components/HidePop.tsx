import React, { useState, useCallback } from "react";
import Popover from "@material-ui/core/Popover";
import { IconButton, Grid } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HideWidgetContent from "./HideWidgetContent";

interface Props {
  name: string
}

let HidePop = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "hide-popover" : undefined;

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container style={{ minHeight: "80px", padding: "16px" }}>
          <Grid item>
            <HideWidgetContent name={props.name} />
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default React.memo(HidePop);
