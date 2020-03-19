import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import HighLightBlock from '../HighLightBlock';

import './Select.scss';

import { KEY_CODES } from '../../../helpers/const/defenitions';
import { isEqual } from '../../../helpers/utils/common';

const SEARCH_DELAY = 500;

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                value: props.value.value,
                title: props.value.title,
            },
            inputValue: {
                value: props.value.value,
                title: props.value.title,
            },
            isActive: false,
            dropDownOptions: [],
            isSearching: false,
        };
        this.serchDelay = null;
        this.wrapperRef = React.createRef();
        this.inputRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((
            nextProps.dropDownOptions && !isEqual(nextProps.dropDownOptions, prevState.dropDownOptions)
        ) || (
            nextProps.value.value !== undefined
            && nextProps.value.title !== undefined
            && !isEqual(prevState.value, nextProps.value)
        )) {
            return {
                dropDownOptions: nextProps.dropDownOptions || prevState.dropDownOptions,
                value: nextProps.value,
                inputValue: nextProps.value,
                isActive: nextProps.type === 'select' ? prevState.isActive : false,
            };
        }
        return null;
    }

    componentDidMount() {
        const { autoFocus, searchOnInit, value } = this.props;
        if (autoFocus) {
            this.focusInput();
        }
        if (searchOnInit) {
            this.handleSearch(value.title);
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        const { isActive } = this.state;
        if (isActive && this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.hideDropDown();
        }
    };

    hideDropDown = () => {
        const { inputValue, value } = this.state;
        if (value.value !== inputValue.value && !this.serchDelay) {
            this.clearForm();
        }
        this.setState({ isActive: false });
    };

    focusInput = () => {
        const { inputId } = this.props;
        setTimeout(() => {
            if (document.getElementById(`input-${inputId}`)) {
                document.getElementById(`input-${inputId}`).focus();
            }
        }, 200);
    };

    onKeyUp = (event) => {
        const { onClose, unique } = this.props;
        const { dropDownOptions, inputValue } = this.state;
        if (event.keyCode === KEY_CODES.ESC) {
            this.clearForm();
            onClose();
        }
        if (event.keyCode === KEY_CODES.ENTER) {
            const option = dropDownOptions.find((item) => item.title === inputValue.title);
            if (!unique && option) {
                this.saveInput(option);
            }
        }
    };

    onInput = (event) => {
        const { onInput } = this.props;
        onInput(event.target.value);
    };

    onFocus = () => {
        const { hasDropDown, searchHandler, searchOnInit } = this.props;
        const { dropDownOptions, isActive, inputValue, value } = this.state;
        if (hasDropDown || !!searchHandler) {
            this.setState({ isActive: true });
            if (
                !isActive
                && searchOnInit
                && (inputValue.value || !dropDownOptions.length)
                && !dropDownOptions.find((item) => value.title === item.title)
            ) {
                this.handleSearch(value.title, true);
            }
        }
    };

    handleSearch = (value, shouldOpen = false) => {
        const { searchHandler, unique, saveHandler, type } = this.props;
        const { isActive, inputValue } = this.state;
        this.setState({ isSearching: true });
        searchHandler({
            value,
            title: value,
        }, (options) => {
            this.setState({
                dropDownOptions: options,
                isSearching: false,
                isActive: shouldOpen ? true : isActive,
            });
            if (unique && !options.length && type !== 'select' && this.inputRef.current.value === inputValue.value) {
                saveHandler(inputValue);
            }
            this.serchDelay = null;
        });
    };

    changeInput = (event) => {
        if (this.serchDelay) {
            clearTimeout(this.serchDelay);
        }
        const { searchHandler, searchImmediately, onChange, cancelHandler, unique, type, hasDropDown } = this.props;
        const newValue = event.target.value;

        if (searchHandler) {
            this.serchDelay = setTimeout(() => {
                if (typeof newValue === 'string' && !searchImmediately && newValue.length < 1) {
                    cancelHandler();
                    return;
                }
                this.handleSearch(newValue);
            }, searchImmediately ? 0 : SEARCH_DELAY);
        }

        onChange({ value: newValue, title: newValue });
        this.setState({
            inputValue: {
                value: newValue,
                title: newValue,
            },
            isActive: hasDropDown && !(unique && !newValue && type !== 'select'),
        });
    };

    clearForm = () => {
        const { cancelHandler, unique } = this.props;
        const { dropDownOptions } = this.state;
        cancelHandler();
        this.setState({
            inputValue: { value: '', title: '' },
            dropDownOptions: unique ? [] : dropDownOptions,
        });
    };

    saveInput = (value) => {
        const { saveHandler, onInput } = this.props;
        const { inputValue, isSearching } = this.state;

        if (!(inputValue.value || (value && value.value))) {
            return;
        }

        if (!this.isUnique()) {
            // this.clearForm();
            // return;
        }

        this.setState({
            isActive: !this.isUnique(),
            inputValue: value || inputValue,
        });

        if (saveHandler && !isSearching && this.isUnique()) {
            saveHandler(value || inputValue);
        }
        onInput((value || inputValue).title || '');
    };

    isUnique = () => {
        const { unique, searchHandler, hasDropDown } = this.props;
        const { dropDownOptions, inputValue } = this.state;
        if (unique === false || !(searchHandler || hasDropDown)) {
            return true;
        }
        return dropDownOptions.length === 0 && inputValue.value;
    };

    render() {
        const {
            alwaysShowButtons, showOkButton, showClearButton,
            unique, readOnly, fullWidth, hasDropDown,
            inputId, type, placeholder,
            inputSuffix, textExistResults, textExistDefault, textNoResults, textSearching,
            onClose, childNode,
        } = this.props;

        const { inputValue, isActive, dropDownOptions, isSearching } = this.state;
        return (
            <div
                className={classNames(
                    'app-dropdown_input__container',
                    fullWidth && 'full-width',
                )}
                ref={this.wrapperRef}
            >
                <input
                    ref={this.inputRef}
                    className={classNames(
                        'app-dropdown_input__input',
                        (isActive || alwaysShowButtons) && 'active',
                        (!this.isUnique() && inputValue.value) && 'not-unique',
                        isSearching && 'searching',
                    )}
                    id={`input-${inputId}`}
                    type={type}
                    readOnly={readOnly}
                    tabIndex={-1}
                    autoComplete="off"
                    placeholder={placeholder}
                    value={inputValue.title}
                    onInput={this.onInput.bind(this)}
                    onKeyUp={this.onKeyUp.bind(this)}
                    onChange={this.changeInput.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                />
                <div className={classNames(
                    'app-dropdown_input__icons',
                    (isActive || inputValue.value) && 'show',
                )}
                >
                    {showOkButton && (
                        <div
                            className={classNames(
                                'app-dropdown_input__icon', 'ok',
                                !this.isUnique() && 'inactive',
                            )}
                            onClick={() => (this.isUnique() ? this.saveInput() : {})}
                        />
                    )}
                    {showClearButton && (
                        <div
                            className={classNames('app-dropdown_input__icon', 'clear')}
                            onClick={() => {
                                this.clearForm();
                                onClose();
                            }}
                        />
                    )}
                </div>
                {inputSuffix && (
                    <div className="app-dropdown_input__suffix">{inputSuffix}</div>
                )}
                {(hasDropDown || (unique && dropDownOptions.length > 0)) && (
                    <div
                        className={classNames(
                            'app-dropdown_input__icon',
                            'expand',
                            isSearching && 'inactive',
                        )}
                        onClick={() => (!isSearching ? this.setState({ isActive: !isActive }) : {})}
                    />
                )}
                {(hasDropDown && (dropDownOptions.length > 0 || (!this.isUnique() && inputValue.value) || !unique)) && (
                    <div className="app-dropdown_input__dropdown">
                        {!this.isUnique() && !isSearching && inputValue.value && (
                            <div style={{ display: 'flex' }}>
                                <div className="app-dropdown_input__icon inactive warning" />
                                <div className="app-dropdown_input__text">{textExistResults}</div>
                            </div>
                        )}
                        {dropDownOptions.length > 0 && !inputValue.value && unique && (
                            <div style={{ display: 'flex' }}>
                                <div className="app-dropdown_input__icon inactive warning" />
                                <div className="app-dropdown_input__text">{textExistDefault}</div>
                            </div>
                        )}
                        {isSearching && textSearching && (
                            <div style={{ display: 'flex' }}>
                                <div className="app-dropdown_input__text">{textSearching}</div>
                            </div>
                        )}
                        {!dropDownOptions.length && inputValue.value && !isSearching && (
                            <div style={{ display: 'flex' }}>
                                <div className="app-dropdown_input__text">{textNoResults}</div>
                            </div>
                        )}
                        {dropDownOptions
                            .filter((item) => (
                                type === 'select'
                                || (item.title || '').toLowerCase().search(inputValue.title.toLowerCase()) > -1
                            )).map((item) => (
                                <div
                                    key={item.value}
                                    className={classNames(
                                        'app-dropdown_input__dropdown-item',
                                        !this.isUnique() && 'large-offset',
                                    )}
                                    title={item.title}
                                    onClick={() => this.saveInput(item)}
                                >
                                    {item.title}
                                </div>
                            ))}
                        {childNode}
                    </div>
                )}
            </div>
        );
    }
}

Select.propTypes = {
    unique: PropTypes.bool,
    autoFocus: PropTypes.bool,
    fullWidth: PropTypes.bool,
    readOnly: PropTypes.bool,
    type: PropTypes.string,
    inputId: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.object,
    alwaysShowButtons: PropTypes.bool,
    showOkButton: PropTypes.bool,
    showClearButton: PropTypes.bool,
    searchImmediately: PropTypes.bool,
    hasDropDown: PropTypes.bool,
    searchOnInit: PropTypes.bool,
    inputSuffix: PropTypes.string,
    dropDownOptions: PropTypes.array,
    saveHandler: PropTypes.func,
    searchHandler: PropTypes.func,
    cancelHandler: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onInput: PropTypes.func,
    textExistResults: PropTypes.string,
    textSearching: PropTypes.string,
    textExistDefault: PropTypes.string,
    textNoResults: PropTypes.string,
    childNode: PropTypes.node,
};

Select.defaultProps = {
    unique: false,
    autoFocus: false,
    fullWidth: false,
    readOnly: false,
    type: 'text',
    inputId: `input${Math.random().toString()}`,
    placeholder: '',
    value: {
        value: '',
        title: '',
    },
    alwaysShowButtons: false,
    showOkButton: false,
    showClearButton: false,
    searchImmediately: false,
    hasDropDown: false,
    searchOnInit: false,
    inputSuffix: '',
    dropDownOptions: undefined,
    saveHandler: () => {
    },
    searchHandler: undefined,
    cancelHandler: () => {
    },
    onClose: () => {
    },
    onChange: () => {
    },
    onInput: () => {
    },
    textExistResults: 'ВНИМАНИЕ! Такое название уже существует',
    textSearching: ' Поиск ...',
    textExistDefault: 'Существующие значения',
    textNoResults: '',
    childNode: null,
};


export default Select;
