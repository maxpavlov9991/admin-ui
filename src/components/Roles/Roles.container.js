import Roles from './Roles.component';
import { connect } from 'react-redux';
import { rolesPermissionsSelector } from '../../store/selectors';
import { rolesActions } from '../../store/actions'


const mapStateToProps = (state) => {
    return {
        roles: rolesPermissionsSelector.roles(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePermission: (roleName, field, permission) => dispatch(rolesActions.resetRolePermission({roleName, field, permission})),
        createRole: (role) => dispatch(rolesActions.createRole(role))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
