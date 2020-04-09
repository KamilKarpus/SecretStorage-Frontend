import { LogModel } from './log.model';

export class GetResourceLogsModel {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    items: LogModel[];
    hasPrevious: boolean;
    hasNext: boolean;
}