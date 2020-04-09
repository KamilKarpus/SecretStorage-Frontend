export class UserModel {
    public id: string;
    public displayName: string;
    public role: string;

    constructor(id:string, displayName: string, role:string){
        this.id = id;
        this.displayName = displayName;
        this.role = role;
    }
}