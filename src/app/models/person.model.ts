import { Address } from './address.model';
import { Contacts } from './contacts.model';

export class Person {

    userId: BigInteger;

    firstName: string;

    lastName: string;

    birthday: Date;

    photo: BinaryType;

    address: Address = new Address();

    contacts: Contacts = new Contacts();

}
