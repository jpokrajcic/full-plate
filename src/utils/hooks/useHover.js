import {useState} from 'react';

function useHover() {
  const [hovering, setHovering] = useState(false);

  const mouseEnter = () => setHovering(true);
  const mouseLeave = () => setHovering(false);

  const attributes = {
    onMouseEnter: mouseEnter,
    onMouseLeave: mouseLeave
  };
  return [hovering, attributes];
}

export default useHover;
