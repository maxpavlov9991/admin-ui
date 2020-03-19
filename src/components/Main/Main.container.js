import Main from './Main.component';
import { roleRightsSelectors, usersSelectors } from '../../store/selectors';
import { connect } from 'react-redux';
import { roleRightsActions } from '../../store/actions';


const mapStateToProps = (state) => {
    return ({
        profile: usersSelectors.profile(state),
        links: roleRightsSelectors.links(state),
    });
};

const mapDispatchToProps = {
    setPermissions: roleRightsActions.setPermissions
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
