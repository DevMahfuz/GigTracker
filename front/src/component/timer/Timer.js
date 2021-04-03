import { useEffect, useState } from "react";
import React from "react";

export default function Timer(props) {
  let [counttime, setCounttime] = useState(parseInt(props.time));

  let getTimeString = (timeInMs) => {
    var delim = ":";
    var hours = Math.floor((timeInMs / (1000 * 60 * 60)) % 60);
    var minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    var seconds = Math.floor((timeInMs / 1000) % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + delim + minutes + delim + seconds;
  };

  let pwt = parseInt(props.time);
  let cst = parseInt(props.lastStart);

  useEffect(() => {
    // Set the date we're counting down to
    let previousWorktime = new Date(pwt).getTime();
    let curentSetationStar = new Date(cst).getTime();

    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = curentSetationStar - now;
      let TotalWorkTime = previousWorktime - distance;

      // Time calculations for days, hours, minutes and seconds
      setCounttime(TotalWorkTime);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
      }
    }, 1000);
  }, [counttime, pwt, cst]);

  return <div>{getTimeString(counttime)}</div>;
}
