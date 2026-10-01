

export interface UserDTO {
    id: number;
    username: string;
    email: string;
    description: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
}

export interface GameCreateDTO {
    name: string;
    description: string;
    price: number;
    developerId: number;
    coverImageUrl?: string;
    releaseDate: string;
}

export interface GameReadDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    developerId: number;
    coverImageUrl: string;
    releaseDate: string;
}
