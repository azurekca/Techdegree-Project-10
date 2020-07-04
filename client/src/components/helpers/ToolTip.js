import React, { useState } from 'react';

/**
 * ToolTip component to be used to present helpful information on click.
 * Area where information will be added has a role of status that
 * will notify assistive technologies when content updates.
 * type="button" attribution on the button is to stop some browsers mistaking the button for a submit button
 * Adapted from https://inclusive-components.design/tooltips-toggletips/
 */
function Tooltip({message}) {
  const [tip, setTip] = useState();
  const [spanTipClass, setSpanTipClass] = useState();

  function showTip() {
    setTip(message);
    setSpanTipClass('tooltip-bubble');
  }

  function hideTip() {
    setTip(null);
    setSpanTipClass(null);
  }

  return (
    <span className="container-tooltip">
      <button type="button" aria-label="more info" onClick={showTip} onBlur={hideTip} onKeyDown={hideTip}>i</button>
      <span role="status" className={spanTipClass}>{tip}</span>
    </span>
  );
}

export default Tooltip;