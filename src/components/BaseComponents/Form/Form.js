import React from 'react';
import PropTypes from 'prop-types';

import './Form.scss';
import Input from '../Input';
import Select from '../Select';


const Form = (props) => {
    return (
        <div
            className={`Form__table Form__table--grid ${props.className}`}
        >
            {props.data.map((item, i) => (
                <React.Fragment key={i}>
                    <span><div>{item.label}</div></span>

                    {(!item.type || item.type === 'input') && (
                        <Input
                            editable={!item.disabled}
                            disabled={item.disabled}
                            placeholder={item.placeholder}
                            value={item.value}
                        />
                    )}


                    {item.type === 'select' && (
                        <Select
                            editable={!item.disabled}
                            disabled={item.disabled}
                            placeholder={item.placeholder}
                            value={item.value}
                            dropDownOptions={item.options}
                            hasDropDown
                            type='select'
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};


Form.defaultProps = {
    data: [],
    className: '',
    hover: false,
};

Form.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
        })]),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        render: PropTypes.func,
        type: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
        })),
    })),
    hover: PropTypes.bool,
};

export default Form;
