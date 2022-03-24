/*
 * @file: Help.jsx
 * @author: Jorge Quitério
 * @copyright (c) 2022 Jorge Quitério
 * @license: MIT
 */
import React from "react";
import { Modal, MobileStepper, Button, withStyles } from "@material-ui/core";
import HelpDiv from "./HelpDiv";

const styles = (theme) => ({
  stepper: {
    background: "transparent",
    position: "fixed",
    height: "5%",
    width: "100%",
    margin: "0 auto",
    bottom: "5%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
      right: "0",
      left: "0",
      position: "absolute",
    },
  },
  skip: {
    position: "absolute",
    bottom: "10%",
    width: "20%",
    right: 0,
    left: 0,
    padding: 0,
    margin: "0 auto",
    color: "white",
    fontFamily: "IBM Plex,Georgia,Roboto, Helvetica, Arial, cursive",
    fontSize: "15px",
    fontStyle: "italic",
    // [theme.breakpoints.up('sm')]: {
    //   fontFamily: '"cursive","Roboto", "Helvetica", "Arial", sans-serif'
    // },
  },
  dotActive: {
    backgroundColor: "white",
  },
  text: {
    fontFamily: "IBM Plex,Georgia,Roboto, Helvetica, Arial, cursive",
    color: "white",
    fontSize: "15px",
    fontStyle: "italic",
    // [theme.breakpoints.up('sm')]: {
    //   fontFamily: '"cursive", "Roboto", "Helvetica", "Arial", sans-serif'
    // },
  },
  backdrop: {
    backgroundColor: "transparent!important",
    // opacity:"0.1 !important"
  },
  modalRoot: {
    zIndex: "99999",
  },
});

class Help extends React.Component {
  static current = null;
  constructor(props) {
    super(props);
    Help.current = this;
    this.state = {
      currStep: 0,
      open: props.open || false,
    };
    HelpDiv.create();
  }

  static reset() {
    Help.current && Help.current.setState({ open: false, currStep: 0 });
  }

  handleClose = () => {
    HelpDiv.clear();
    this.setState({
      open: false,
      currStep: 0,
    });
  };

  handleNext = () => {
    let children = this.props.children;
    children.forEach((child, idx) => {
      document.getElementById(child.props.elementId) === null || undefined
        ? (children = children.filter(
            (id) => id.props.elementId !== child.props.elementId
          ))
        : "";
    });
    if (this.state.currStep >= React.Children.count(children) - 1) {
      this.handleClose();
    } else {
      this.setState((prevState) => ({ currStep: currStep + 1 }));
    }
  };

  handleBack = () => {
    this.setState((prevState) => ({ currStep: prevState.currStep - 1 }));
  };

  render() {
    const { currStep } = this.state;
    const { classes, children } = this.props;

    let childrens = this.props.children;
    childrens.forEach((c, idx) => {
      document.getElementById(child.props.elementID) === null
        ? (childrens = childrens.filter((id) => id.props.elementId))
        : "";
    });
    const childArr = React.Children.toArray(childrens);
    const childCount = childArr.length;
    const currrChildrens =
      childCount > 0
        ? childCount > currStep
          ? childArr[currStep]
          : childArr[childCount - 1]
        : null;
    return (
      <>
        {childCount > 0 && (
          <Modal
            open={this.state.open}
            onClose={this.handleNext}
            style={{
              zIndex: "99999",
              backgroundColor: "transparent!important",
            }}
            hideBackdrop={true}
            // classes={{
            //   root: classes.modalRoot
            // }}
            // BackdropProps={{
            //   classes: { root: classes.backdrop }
            // }}
          >
            <div>
              <div onClick={this.handleNext}>{activeChild}</div>
              <MobileStepper
                steps={childCount} //maxSteps
                position="static"
                currStep={currStep}
                className={classes.stepper}
                classes={{
                  dotActive: classes.dotActive,
                }}
                nextButton={
                  <Button
                    size="small"
                    onClick={this.handleNext}
                    className={classes.text}
                    aria-label="Done/Next"
                  >
                    {currStep == childCount - 1 ? <p>Done</p> : <p>Next</p>}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={this.handleBack}
                    disabled={currStep === 0}
                    className={classes.text}
                    aria-label="Done/Next"
                  >
                    {currStep == 0 ? <p></p> : <p>Back</p>}
                  </Button>
                }
              />
              <Button
                size="small"
                onClick={this.handleClose}
                className={classes.skip}
              >
                {" "}
                Skip{" "}
              </Button>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Help);
