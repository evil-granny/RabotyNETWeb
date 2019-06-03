import { Skill } from './skill.model';
import { Education } from './education.model';
import { Job } from './job.model';
import { Person } from './person.model';

export class Resume {

    resumeId: BigInteger;

    position: string;

    skills: Skill[] = [];

    education: Education = new Education();

    jobs: Job[] = [];

    person: Person = new Person();

    reviewed: boolean;

}
