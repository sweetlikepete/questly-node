

import { Task } from "../../../task";
import { CleanBuildTask } from "./build";
import { CleanCacheTask } from "./cache";


interface IConfig {
    name?: string;
}


export class CleanTask extends Task{

    public build: CleanBuildTask;
    public cache: CleanCacheTask;

    constructor(config: IConfig = {}){

        super(config);

        this.name = config.name || "web.clean";

        this.build = new CleanBuildTask({ name: "web.clean.build" });
        this.cache = new CleanCacheTask({ name: "web.clean.cache" });

    }

}


/*export default class CleanTask extends Task{

    constructor(args = {}){

        super(args);

        this.name = args.name || "web.clean";

        this.build = new CleanBuildTask({ name: "web.clean.build" });
        this.cache = new CleanCacheTask({ name: "web.clean.cache" });

    }

    run(){

        return gulp.parallel(
            this.build.run(),
            this.cache.run()
        );

    }

} */
