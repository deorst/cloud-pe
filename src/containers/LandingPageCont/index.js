import { connect } from 'react-redux';
import { LandingPageComp } from '../../components';
import { fetchSecuritiesIfNeeded } from "../../actions";

const mapStateToProps = state => {
    return {
        securities: state.securities.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSecuritiesIfNeeded: () => dispatch( fetchSecuritiesIfNeeded() )
    }
};

const LandingPageCont = connect(
    mapStateToProps,
    mapDispatchToProps
)( LandingPageComp );

export default LandingPageCont;