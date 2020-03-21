import Roles from './Roles.component';
import { connect } from 'react-redux';
import { rolesPermissionsSelector, permissionListSelector } from '../../store/selectors';
import { rolesActions, permissionListActions } from '../../store/actions'


const mapStateToProps = (state) => {
    return {
        roles: rolesPermissionsSelector.roles(state),
        permissions: permissionListSelector.permissions(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePermission: (name, field) => dispatch(rolesActions.changePermission({name, field})),
        createRole: (role) => dispatch(rolesActions.createRole(role)),
        loadData: () => dispatch(rolesActions.loadData()),
        deleteRole: (name) => dispatch(rolesActions.deleteRole(name)),
        loadList: () => dispatch(permissionListActions.loadList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
