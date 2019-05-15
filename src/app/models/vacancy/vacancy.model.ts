import { Requirement } from '../requirement.model';
import { Company } from '../CompanyModel/company.model';

export class Vacancy {

    vacancyId: BigInteger;

    description: string;

    position: string;

    employment: string;

    salary: Int8Array;

    hotVacancy: boolean;

    company: Company = new Company();

    requirements: Requirement[] = Array<Requirement>();

}
