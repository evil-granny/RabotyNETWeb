import { Address } from './address.model';
import { Contact } from './contact.model';
import { Photo } from './photo.model';
import { User } from './user.model';

export class Person {

    userId: BigInteger;

    firstName: string = "";

    lastName: string = "";

    birthday: Date = null;

    photo: Photo = new Photo();

    address: Address = new Address();

    contact: Contact = new Contact();

    user: User = new User();

}
