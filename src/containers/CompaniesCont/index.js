import { connect } from 'react-redux';
import { CompaniesComp } from '../../components';
import { fetchCompanies } from "../../actions";

const mapStateToProps = state => {
    return {
        companies: state.companies.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCompanies: query => dispatch( fetchCompanies( query ))
    }
};

const CompaniesCont = connect(
    mapStateToProps,
    mapDispatchToProps
)( CompaniesComp );

export default CompaniesCont;