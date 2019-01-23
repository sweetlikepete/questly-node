

import gulp from "gulp";
import { Task } from "../../../task";
import { LintJSTask } from "./js";


interface IConfig {
    name?: string;
}


export class LintTask extends Task{

    public js: LintJSTask;

    constructor(config: IConfig = {}){

        super(config);

        this.name = config.name || "web.lint";

        this.js = new LintJSTask({
            globs: [
                "src/**/*.{js,jsx,mjs}",
                "!**/build/**/*.{js,jsx,mjs}",
                "!node_modules/**/*.{js,jsx,mjs}"
            ],
            name: "web.lint.js"
        });

    }

    public run(){

        return gulp.parallel(
            this.js.run()
        );

    }

    public watch(){

        return gulp.parallel(
            this.js.watch()
        );

    }

}
