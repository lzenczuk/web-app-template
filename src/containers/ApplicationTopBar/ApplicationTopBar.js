import {connect} from "react-redux";

import { ApplicationTopBar as ApplicationTopBarComponent } from '../../components/ApplicationTopBar'
import {eosLoginRequest, eosLogoutRequest} from "../../modules/user/actions";



const mapStateToProps = state => {
    return state.user.toJS();
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => {
            dispatch(eosLoginRequest())
        },
        onLogout: () => {
            dispatch(eosLogoutRequest())
        }
    }
};

export const ApplicationTopBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationTopBarComponent);
