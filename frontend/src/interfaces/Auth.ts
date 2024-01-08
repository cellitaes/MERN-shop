export interface AuthFormValues {
    email: string;
    password: string;
    confirmPassword?: string;
    name?: string;
    surname?: string;
}

export interface AuthStore {
    isLoggedIn: boolean;
    isAdmin: boolean;
    email: string | null;
    userId: string | null;
    token: string | null;
}
