export interface Member {
    id: string; // Unique identifier for the member
    name: string; // Name of the member
    email?: string; // Optional email address of the member
    role?: string; // Optional role of the member (e.g., 'admin', '
    team: string; // Team to which the member belongs
}