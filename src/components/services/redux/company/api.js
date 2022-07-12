import { GET_COMPANY_DETAIL_API } from '../../ApiService';
import { HTTP } from '../../core';

function fetchCompanies() {
    return HTTP.GET(GET_COMPANY_DETAIL_API);
}

export default {
    fetchCompanies,
}