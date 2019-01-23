
declare module "gulp-print" {

    export default function print(formatter: (message: string) => void): NodeJS.ReadWriteStream;

}
