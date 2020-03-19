import Roles from './Roles.component';
import { connect } from 'react-redux';
import { rolesPermissionsSelector } from '../../store/selectors';
import { rolesPermissionsActions } from '../../store/actions'


const mapStateToProps = (state) => {
    return {
        roles: rolesPermissionsSelector.roles(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePermission: (roleName, field, permission) => dispatch(rolesPermissionsActions.resetRolePermission({roleName, field, permission}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
