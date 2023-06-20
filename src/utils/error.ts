export function getErrorMsg(error: Error | string): string {
    if ((error as Error)?.message) {
        return (error as Error)?.message;
    } else {
        return error as string;
    }
}