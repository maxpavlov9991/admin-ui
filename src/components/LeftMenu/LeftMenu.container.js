import LeftMenu from './LeftMenu.component';
import { connect } from 'react-redux';
import { roleRightsSelectors, usersSelectors } from '../../store/selectors';


const mapStateToProps = (state) => {
    return ({
        profile: usersSelectors.profile(state),
        links: roleRightsSelectors.links(state),
    });
};

export default connect(mapStateToProps)(LeftMenu);
