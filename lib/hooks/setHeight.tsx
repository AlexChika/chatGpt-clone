// Mobile....
/*Hooks is used to dynamically set the height of an element to the visible browser height excluding browse-nav-bars using the window.innerHeight aproach */

import { MutableRefObject, useEffect } from "react";

const SetHeight = (
  elementREf: MutableRefObject<HTMLDivElement | null>,
  sub = 76
) => {
  // elementRef is an html element ref from useRef
  // 76 serves as the bottom form height

  /* -- dynamic  Wrapper Height logic - */
  useEffect(() => {
    const refElement = elementREf.current!;
    if (!refElement) return;

    function set(_height: number) {
      refElement.style.height = `${_height - sub}px`;
    }

    let _height = window.innerHeight;
    set(_height); //initial set on render

    function handleScrollEvent() {
      if (_height === window.innerHeight) return;
      _height = window.innerHeight;
      set(_height);
    }

    refElement.addEventListener("scroll", handleScrollEvent);

    return () => {
      refElement.removeEventListener("scroll", handleScrollEvent);
    };
  }, [elementREf, sub]); //dep is almost unnexessary
};

export default SetHeight;
