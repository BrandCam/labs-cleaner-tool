import React, { useState, Fragment, Children } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

interface MySettings {
  title?: string;
  onToggle?: (show: boolean) => void;
  onClick?: () => void;
  children?: any;
}

const Accordion = ({ title, children, onToggle }: MySettings) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <h2
        onClick={() => {
          setShow(!show);
          if (onToggle) {
            onToggle(!show);
          }
        }}
      >
        {title}
      </h2>
      {show ? <Fragment>{children}</Fragment> : null}
    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.any,
  onToggle: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Accordion;