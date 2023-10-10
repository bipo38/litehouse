export { };

declare global {
    interface Analysis {
        created_at: string;
        results: Array<object>;
    }
}
