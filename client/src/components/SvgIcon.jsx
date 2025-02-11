import React from 'react';

const SvgIcon = ({ name, ...props }) => (
  <svg {...props}>
    <use xlinkHref={`sprite.svg#${name}`} />
  </svg>
);

export default SvgIcon;
