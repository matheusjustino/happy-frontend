export interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    description: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: Array<{ url: string, id: string }>
}