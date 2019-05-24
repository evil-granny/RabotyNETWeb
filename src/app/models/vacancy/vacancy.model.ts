import { Requirement } from '../requirement.model';
import { Company } from '../CompanyModel/company.model';

export class Vacancy {

    vacancyId: BigInteger;

    description: string;

    position: string;

    employment: string;

    salary: Int8Array;

    currency : string;

    hotVacancy: boolean;

    company: Company = new Company();

    requirements: Requirement[] = Array<Requirement>();

    constructor() {
        this.currency = 'USD';
        this.employment = 'FULL';
      }

}
