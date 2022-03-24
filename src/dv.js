/**
 * @file: dv.js
 * @author: Jorge Quitério
 * @copyright (c) 2022 Jorge Quitério
 * @license: MIT
 */

import CONST from "./consts";

export default class {
  static create = () => {
    if (document.getElementById(CONST.DEFAULT_DIV) === null) {
      let rootDiv = document.getElementsByTagName("body")[0]; //this creates a blank div on which the box shadow will be applied
      let newDiv = document.createElement("div");
      newDiv.id = CONSTANTS.ONBOARDING_DIV_ID;
      rootDiv.appendChild(newDiv);
    }
  };

  static setTarget = (targetRect, disableArrow) => {
    const defDiv = document.getElementById(CONST.DEFAULT_DIV);
    if (defDiv && targetRect) {
      defDiv.style.visibility = "visible";
      defDiv.style.transition = "all .5s ease-out";
      defDiv.style.position = "absolute";
      defDiv.style.left = targetRect.left + "px";
      defDiv.style.top = targetRect.top + "px";
      defDiv.style.width = targetRect.width + "px";
      defDiv.style.height = targetRect.height + "px";
      defDiv.style.boxShadow = "0 0 0 9999px rgba(0, 0, 0, 0.7)";
      if (!disableArrow) {
        defDiv.style.border = "1px solid white";
        defDiv.style.borderRadius = "5px";
      }
      defDiv.style.zIndex = "99999";
    }
  };

  static clear = () => {
    const defDiv = document.getElementById(CONST.DEFAULT_DIV);
    if (defDiv) {
      defDiv.style.visibility = "hidden";
      defDiv.style.left = "0px";
      defDiv.style.top = "0px";
      defDiv.style.width = "0px";
      defDiv.style.height = "0px";
      defDiv.style.boxShadow = "none";
      defDiv.style.border = "none";
      defDiv.style.borderRadius = "0";
      defDiv.style.zIndex = "-1";
    }
  };
}
