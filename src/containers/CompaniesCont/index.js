import { connect } from 'react-redux';
import { CompaniesComp } from '../../components';
import { fetchCompaniesIfNeeded } from "../../actions";

const mapStateToProps = state => {
    return {
        companies: state.companies.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCompaniesIfNeeded: () => dispatch( fetchCompaniesIfNeeded())
    }
};

const CompaniesCont = connect(
    mapStateToProps,
    mapDispatchToProps
)( CompaniesComp );

export default CompaniesCont;