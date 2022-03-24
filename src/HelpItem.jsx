/*
 * @file: HelpItem.jsx
 * @author: Jorge Quitério
 * @copyright (c) 2022 Jorge Quitério
 * @license: MIT
 */
import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import ArrowCurved from "./arrow";
import HelpDiv from "./HelpDiv";

const styles = (theme) => ({
  textStyle: {
    color: "white",
    fontFamily: "IBM Flex, Georgia,Roboto, Helvetica, Arial, cursive",
    fontStyle: "italic",
  },
  paperStyle: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "transparent",
    width: "60%",
    transform: "translate(-50%, -50%)",
  },
});

class HelpItem extends React.Component {
  constructor(props) {
    super(props);
    this.msgBox = React.createRef();
    this.state = {
      msgBoxRect: null,
      targetRect: null,
      disableArrow:
        props.disableArrow !== undefined ? props.disableArrow : false,
    };
  }

  componentDidMount() {
    this.setPosition();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.elementId !== this.props.elementId) this.setPosition();
  }

  setPosition = () => {
    const { elementId } = this.props;

    if (this.msgBox.current && this.msgBox.current.getBoundingClientRect)
      this.setState({
        msgBoxRect: this.msgBox.current.getBoundingClientRect(),
      });
    const el = document.getElementById(elementId) || null;
    const targetRect =
      (el && el.getBoundingClientRect && el.getBoundingClientRect()) || null;
    this.setState({
      targetRect: targetRect,
    });
  };
  render() {
    const { classes, disableArrow } = this.props;
    const { msgBoxRect, targetRect } = this.state;
    HelpDiv.setTarget(targetRect, disableArrow);
    return (
      <>
        <div>
          <ArrowCurved
            color="white"
            width={this.state.disableArrow && "0"}
            startBox={msgBoxRect}
            endBox={targetRect}
          />
          <div
            ref={this.msgBox}
            className={classes.paperStyle}
            style={{ top: this.props.top }}
          >
            <Typography variant="h6" className={classes.textStyle}>
              {this.props.message}
            </Typography>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HelpItem);
