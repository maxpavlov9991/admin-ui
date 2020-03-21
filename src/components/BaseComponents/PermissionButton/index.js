import React from 'react';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import './PermissionButton.css'


const PermissionButton = (props) => {

    const calcVariant = (variant) => {
        return (variant === 'edit') ? <CreateOutlinedIcon/>
            : (variant === 'read') ? <VisibilityOutlinedIcon/>
            : (variant === 'noaccess') ? <VisibilityOffOutlinedIcon/>
            : null
    }

    const calcDisable = (disable) => {
        return (disable) ? 'disable' : null
    }

    return (
        <button onClick={(props.disable) ? null : props.onClick} className={calcDisable(props.disable)}>
            {calcVariant(props.variant)}
        </button>
    )
}

export default PermissionButton
