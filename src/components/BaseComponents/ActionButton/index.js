import React from 'react';

import ControlPointDuplicateOutlinedIcon from '@material-ui/icons/ControlPointDuplicateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';



const ActionButton = (props) => {

    const calcVariant = (variant) => {
        return (variant === 'create') ? <ControlPointDuplicateOutlinedIcon/>
            : (variant === 'delete') ? <DeleteOutlinedIcon/>
            : null
    }

    return (
        <button onClick={props.onClick}>
            {calcVariant(props.variant)}
        </button>
    )
}

export default ActionButton
