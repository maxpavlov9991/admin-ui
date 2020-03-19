import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionToggle } from 'react-bootstrap';
import cx from 'classnames';

import './AccordionHeader.scss';


const AccordionHeader = (props) => {
    const handleToggle = useAccordionToggle(props.eventKey, (e) => props.onClick(e, props.eventKey));

    return (
        <button
            onClick={handleToggle}
            className={cx('AccordionHeader', { ['AccordionHeader__active']: props.isActive })}
        >
            {props.children}
        </button>
    );
};

AccordionHeader.propTypes = {
    eventKey: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
};

export default AccordionHeader;
