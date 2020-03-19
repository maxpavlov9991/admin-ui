import React from 'react';
import PropTypes from 'prop-types';

const HighLightBlock = ({
                            string,
                            highLight,
                            highLights,
                        }) => {
    if (highLights.length) {
        const result = [];
        const tmp = [];
        string.split(' ').forEach((word, ind) => {
            highLights.forEach((val) => {
                const escapedSearch = val.replace(/[|\\{()[^$+*?.-]/g, '\\$&');
                if (tmp.indexOf(ind) === -1 && word.search(new RegExp(`(${escapedSearch})`, 'gi')) > -1) {
                    tmp.push(ind);
                    const parts = word.split(new RegExp(`(${escapedSearch})`, 'gi'));
                    parts.forEach((part, ind2) => {
                        if (part.toLowerCase() === escapedSearch.toLowerCase()) {
                            result.push(<b key={`${ind}-${ind2}`}>{part}</b>); // eslint-disable-line
                        } else {
                            result.push(<span key={`${ind}-${ind2}`}>{part}</span>); // eslint-disable-line
                        }
                    });
                    result.push(<span key={`${ind}-space`}>&nbsp;</span>); // eslint-disable-line
                }
            });
            if (tmp.indexOf(ind) === -1) {
                result.push(<span key={`${ind}`}>{word}</span>); // eslint-disable-line
                result.push(<span key={`${ind}-space`}>&nbsp;</span>); // eslint-disable-line
            }
        });
        return (result.reduce((prev, curr) => [prev, '', curr]));
    }
    const search = highLight.replace(/[|\\{()[^$+*?.-]/g, '\\$&');
    const parts = string.split(new RegExp(`(${search})`, 'i'));
    return (
        parts.map((part, index) => (part.toLowerCase() === search.toLowerCase()
            ? <b key={index}>{part}</b> // eslint-disable-line
            : <span key={index}>{part}</span>)) // eslint-disable-line
    );
};

HighLightBlock.propTypes = {
    string: PropTypes.string.isRequired,
    highLight: PropTypes.string,
    highLights: PropTypes.array,
};

HighLightBlock.defaultProps = {
    highLight: '',
    highLights: [],
};

export default HighLightBlock;
