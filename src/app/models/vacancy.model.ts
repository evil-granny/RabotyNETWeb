import { Requirement } from './requirement.model';
import { Company } from './company.model';

export class Vacancy {

    vacancyId: BigInteger;

    position: string;

    employment: string;

    salary: Int8Array;

    company: Company = new Company();

    requirements: Requirement[] = Array<Requirement>();

}