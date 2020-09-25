export interface IManager {
    name: string;
    type: ManagerType;
}

export enum ManagerType { ServiceManager, PersonalManager }''