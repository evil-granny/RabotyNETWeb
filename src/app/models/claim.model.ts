import { User } from './user.model';
import { Company } from './company.model';

export class Claim {
    
    claimId: BigInteger;

    title: string;

    description: string;

    user: User = new User();

    company: Company = new Company();
}