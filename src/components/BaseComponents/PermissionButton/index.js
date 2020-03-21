import React from 'react';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';


const PermissionButton = (props) => {

    const calcVariant = (variant) => {
        return (variant === 'edit') ? <CreateOutlinedIcon/>
            : (variant === 'read') ? <VisibilityOutlinedIcon/>
            : (variant === 'noaccess') ? <VisibilityOffOutlinedIcon/>
            : null
    }

    return (
        <button onClick={props.onClick}>
            {calcVariant(props.variant)}
        </button>
    )
}

export default PermissionButton
