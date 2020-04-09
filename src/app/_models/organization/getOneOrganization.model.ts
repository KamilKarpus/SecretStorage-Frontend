import {UserModel} from '../user/User.model';

export class getOneOrganizationModel {
    public id: string;
    public name: string;
    public users: UserModel[];

    constructor(id: string, name: string, users:UserModel[]){
        this.id = id;
        this.name = name;
        this.users = users;
    }
}