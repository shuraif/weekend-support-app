export interface User  {
    id: number;
    name: string;
    email: string;
    createdOn: Date;
    lastLogin: Date;
    isActive: boolean;
    team: string;
};