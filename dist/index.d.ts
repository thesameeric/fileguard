export declare class FileGuard {
    file: any;
    errorMessage: string[];
    error: boolean;
    constructor(inputFile: any);
    type(allowedFileTypes: string[]): this;
    size(fileSize: number): this;
    private errorHandler;
}
