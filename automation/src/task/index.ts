

import log from "fancy-log";
import gulp from "gulp";
import watch from "gulp-watch";
import through from "through2";


interface IConfig {
    name?: string;
    globs?: string | Array<string>;
}

export interface IRunnerArgs{
    globs?: string | Array<string>;
    watching?: boolean;
}


export abstract class Task{

    public dest: typeof gulp.dest;
    public globs?: string | Array<string>;
    public name?: string;

    constructor(config: IConfig = {}){

        this.dest = gulp.dest;
        this.globs = config.globs;
        this.name = config.name;

    }

    public fail(message?: string){

        if(message){
            log(message);
        }

        // Make it beep like a jeep
        process.stdout.write("\u0007");

    }

    public run(){

        const fn = () => this.runner({});

        Object.defineProperty(fn, "name", {
            value: `${ this.name }`,
            writable: false
        });

        return fn;

    }

    public async runner(runnerArgs: IRunnerArgs): Promise<void>{

        return new Promise(resolve => {

            resolve();

        });

    }

    // The callback uses the chunk from through2 which has a type of any
    // tslint:disable-next-line: no-any
    public skip(func: (chunk: any) => void){

        return through({ objectMode: true }, function blank(chunk, encoding, cb){

            // Through2 callback has a chunk with type any
            // tslint:disable-next-line: no-unsafe-any
            if(chunk.isNull()){

                cb();

            }else{

                func(chunk);

                // Through2 requires this.push to be called in this way
                // tslint:disable-next-line: no-invalid-this
                this.push(chunk);

                cb();

            }

        });

    }

    public async src(globs: string | Array<string>, options = { base: "./" }){

        await new Promise<void>(resolve => {

            gulp.src(globs, options);

            resolve();

        });

    }

    public watch(){

        const fn = () => this.watcher();

        Object.defineProperty(fn, "name", {
            value: `${ this.name }.watch`,
            writable: false
        });

        return fn;

    }

    public watcher(){

        watch(this.globs || __filename, {
            base: "src",
            events: [
                "add",
                "change",
                "unlink",
                "addDir",
                "unlinkDir"
            ]
        })
        .on("change", async (globs: string | Array<string>) => {

            await this.runner({
                globs,
                watching: true
            });

        });

    }

}
