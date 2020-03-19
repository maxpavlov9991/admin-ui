import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CloseIcon from '../../../assets/icons/close.svg';

import './Input.scss';

const Input = (props) => {
    const [value, setValue] = useState(props.value);
    const closeRef = useRef();
    const [showClose, setShowClose] = useState(false);

    const handleFocus = useCallback(() => setShowClose(true), []);
    const handleBlur = useCallback(() => setTimeout(() => setShowClose(false), 100), []);

    const handleClose = useCallback(() => setValue(''), []);

    return (
        <div
            className='Input'
            onBlurCapture={handleBlur}
        >
            <input
                className={cx(
                    'Input__field', {
                        ['Input__editable']: props.editable,
                        ['Input__disabled']: props.disabled,
                    },
                )}
                disabled={props.disabled}
                value={value}
                onFocus={handleFocus}
                onChange={useCallback(e => setValue(e.target.value), [])}
                type="text"
                placeholder={props.placeholder}
            />
            <img
                src={CloseIcon}
                ref={closeRef}
                alt="close"
                className={cx('Input__close', {
                    ['Input__close--hide']: !showClose
                })}
                onClick={handleClose}
            />
        </div>
    );
};

Input.propTypes = {
    editable: PropTypes.bool,
    disabled: PropTypes.bool,

    value: PropTypes.string,
    placeholder: PropTypes.string,
};

Input.defaultProps = {
    editable: true,
    value: '',
};


export default Input;
