

declare module "gulp-eslint" {

    interface IOptions {
        cache?: boolean;
        configFile?: string;
        fix?: boolean;
        quiet?: boolean;
        useEslintrc?: boolean;
        warnFileIgnored?: boolean;
    }

    function eslint(options: string | IOptions): NodeJS.ReadWriteStream;

    namespace eslint {

        export function failAfterError(): NodeJS.ReadWriteStream;

        export function format(formatter: string, fail: () => void): NodeJS.ReadWriteStream;

    }

    export default eslint;

}
