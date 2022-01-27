import React, { useContext, MouseEvent, useState, useRef } from "react";
import ModeContext from "../contexts/ModeContext";

import SettingsIcon from "@material-ui/icons/Settings";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CheckIcon from "@material-ui/icons/Check";
import { IconButton } from "@material-ui/core";
import { Emoji } from "emoji-mart";
import {
  Popper,
  Grow,
  Paper,
  Button,
  Grid,
  ButtonGroup,
  ListItemIcon,
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Divider,
  ClickAwayListener,
} from "@material-ui/core";

import { ucFirst } from "../utils";
import ModeDialog from "../dialogs/ModeDialog";

const DenseListIcon = ({ children }: { children: React.ElementRef<any>[] }) => {
  return (
    <ListItemIcon style={{ minWidth: "36px", margin: "0px" }}>
      {children}
    </ListItemIcon>
  );
};

const ModeSelector = () => {
  const [open, setOpen] = useState(false);
  const [showModeDialog, setShowModeDialog] = useState(false);
  const anchorRef = useRef(null);
  const { modes, modeName, _setModeName, mode, prevMode } = useContext(
    ModeContext
  );

  const handleClick = () => {
    //if there was a previous mode, switch to that
    if (prevMode) {
      _setModeName(prevMode);
    } else {
      //if there was no previous mode
      //find the next mode and go there
      //if that doesn't exist, goto default 0
      let modesArr = Object.keys(modes);
      let currModeIndex = modesArr.indexOf(modeName);
      if (modesArr[currModeIndex + 1]) {
        _setModeName(modesArr[currModeIndex + 1]);
      } else {
        _setModeName(modesArr[0]);
      }
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent<Document, globalThis.MouseEvent>) => {
    // @ts-expect-error parentNode not defined
    let targetClassList = event.target.parentNode.classList.value;
    if (
      // @ts-expect-error `current` not defined
      (anchorRef.current && anchorRef.current.contains(event.target)) ||
      targetClassList.indexOf("modeIcon") !== -1 ||
      targetClassList.indexOf("emoji-mart-emoji") !== -1
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {showModeDialog && (
        <ModeDialog close={() => setShowModeDialog(false)} />
      )}
      <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
        <Button aria-label="Set Mode" onClick={handleClick} size="small">
          {!mode.icon && (
            <ViewCompactIcon fontSize="small" className="modeIcon" />
          )}
          {mode.icon && (
            <Emoji emoji={mode.icon} size={16} />
          )}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Grid
                  container
                  style={{ padding: "8px", minWidth: "200px" }}
                  direction="column"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>Modes</Grid>
                      <Grid item>
                        <IconButton aria-label="Open Mode Dialog" size="small" onClick={() => setShowModeDialog(true)}>
                          <SettingsIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item style={{ paddingTop: "4px" }}>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <List component="nav" dense>
                        {modes &&
                          Object.keys(modes).map((name) => {
                            return (
                              <ListItem
                                button
                                key={name}
                                onClick={() => {
                                  _setModeName(name);
                                }}
                              >
                                <DenseListIcon>
                                  {modes[name].icon && (
                                    <Emoji emoji={modes[name].icon!} size={16} />
                                  )}
                                  {!modes[name].icon && (
                                    <ViewCompactIcon fontSize="small" />
                                  )}
                                </DenseListIcon>
                                <ListItemText
                                  primary={
                                    <Typography variant="body2">
                                      {ucFirst(name)}
                                    </Typography>
                                  }
                                />
                                {name === modeName && (
                                  <ListItemSecondaryAction>
                                    <CheckIcon fontSize="small" />
                                  </ListItemSecondaryAction>
                                )}
                              </ListItem>
                            );
                          })}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ModeSelector;
