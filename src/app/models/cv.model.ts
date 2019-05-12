import { Skill } from './skill.model';
import { Education } from './education.model';
import { Job } from './job.model';
import { Person } from './person.model';
import { Contact } from './contact.model';

export class CV {

    cvId: BigInteger;

    photo: string;

    position: string;

    skills: Skill[] = [];

    education: Education = new Education();

    jobs: Job[] = [];

    person: Person = new Person();
   
}