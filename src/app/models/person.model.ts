import { Address } from './address.model';
import { Contact } from './contact.model';

export class Person {

    userId: BigInteger;

    firstName: string = "";

    lastName: string= "";

    birthday: Date= null;

    photo: BinaryType= null;

    address: Address = new Address();

    contact: Contact = new Contact();

}