export declare class FileGuard {
    private file;
    private errorMessage;
    private error;
    constructor(inputFile: any);
    type(allowedFileTypes: string[]): this;
    size(fileSize: number): this;
    private errorHandler;
}
