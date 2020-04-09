export class GetResourceInfoModel {
    id: string;
    name: string;
    owner: string;
    readedTime: string;
    readedBy: string;
    editedTime: string;
    editedBy: string;
    constructor(id: string, name: string, owner: string, readedTime: string,readedBy: string,
         editedTime: string, editedBy: string){
             this.id = id;
             this.name = name;
             this.owner = owner;
             this.readedTime = readedTime;
             this.readedBy = readedBy;
             this.editedTime = editedTime;
             this.editedBy = editedBy;
         }
}