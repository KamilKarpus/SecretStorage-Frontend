export class LogModel {
    logId: string;
    accesorName: string;
    statudId: number;
    status: string;
    time: string;

    constructor(logId: string, accesorName: string, statusId: number, status: string, time: string){
        this.logId = logId;
        this.accesorName = accesorName;
        this.statudId = statusId;
        this.status = status;
        this.time = time;
    }
}