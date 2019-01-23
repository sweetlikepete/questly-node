

import { CleanBuildTask } from "./build";
import { CleanCacheTask } from "./cache";
import { Task } from "../../../task";


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

