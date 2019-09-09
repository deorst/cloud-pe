import { connect } from 'react-redux';
import { CompanyComp } from '../../components';
import { addComment, fetchCompanyIfNeeded } from "../../actions/company";

const mapStateToProps = state => {
    return {
        companies: state.companies.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCompanyIfNeeded: ticker => dispatch( fetchCompanyIfNeeded( ticker )),
        addComment: comment => dispatch( addComment( comment ))
    }
};

const CompanyCont = connect(
    mapStateToProps,
    mapDispatchToProps
)( CompanyComp );

export default CompanyCont;