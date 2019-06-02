import { Company } from './company.model';

export class CompanyPaginationDTO {

    count: number;

    companies: Company[] = [];

}