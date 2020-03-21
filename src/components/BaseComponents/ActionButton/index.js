import React from 'react';

import ControlPointDuplicateOutlinedIcon from '@material-ui/icons/ControlPointDuplicateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import './ActionButton.css'



const ActionButton = (props) => {

    const calcVariant = (variant) => {
        return (variant === 'create') ? <ControlPointDuplicateOutlinedIcon/>
            : (variant === 'delete') ? <DeleteOutlinedIcon/>
            : (variant === 'add') ? <AddOutlinedIcon/>
            : null
    }

    const calcActivity = (active) => {
        return (active) ? 'active' : 'default'
    }

    return (
        <button onClick={props.onClick} className={calcActivity(props.active)}>
            {calcVariant(props.variant)}
        </button>
    )
}

export default ActionButton
