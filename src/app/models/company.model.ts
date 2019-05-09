import { Contact } from './contact.model';
import { Address } from './address.model';

export class Company {

    companyId: BigInteger;

    name: string;

    edrpou: string;

    description: string;

    website: string;

    logo: string;

    approved: boolean = false;

    contact: Contact = new Contact();

    address: Address = new Address();

}