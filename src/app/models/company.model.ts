import { Contact } from './contact.model';
import { Address } from './address.model';
import { User } from './user.model';
import { Claim } from './claim.model';
import { Status } from './status.model';

export class Company {

    companyId: BigInteger;

    name: string;

    edrpou: string;

    description: string;

    website: string;

    logo: string;

<<<<<<< HEAD
    approved: boolean = false;

    contact: Contact = new Contact();
=======
    contact: Contacts = new Contacts();
>>>>>>> dev

    address: Address = new Address();

    user: User = new User();

    claims: Claim[] = new Array();

    status: Status;
}