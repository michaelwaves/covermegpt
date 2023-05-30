interface profile {
    name: string,
    experience: string,
}

export interface userSchema {
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    email?: string,
    profiles?: profile[],
}