declare module "auth-jwt" {
    export function verify(req: any, secret: string): Promise<object>;
    export function getToken(req: string): Promise<object>;
}