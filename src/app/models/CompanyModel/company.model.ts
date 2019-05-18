import { Contact } from '../contact.model';
import { Address } from '../address.model';
import { User } from '../user.model';
import { Claim } from '../claim.model';
import { Photo } from '../photo.model';

export class Company {

    companyId: BigInteger;

    name: string;

    edrpou: string;

    description: string;

    website: string;

    logo: string;

    contact: Contact = new Contact();

    address: Address = new Address();

    user: User = new User();

    claims: Claim[] = new Array();

    status: string;

    photo: Photo = new Photo();
}
