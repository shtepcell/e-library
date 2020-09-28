export interface IManager {
    firstName: string;
    middleName: string;
    lastName: string;
    category: ManagerType;
}

export enum ManagerType { ServiceManager = 'serviceManager', PersonalManager = 'personalManager' };