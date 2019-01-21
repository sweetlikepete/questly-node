

import cache from "gulp-cache";
import path from "path";
import { Task } from "../../../task";
import utils from "../../../utils";


interface IConfig {
    name?: string;
}


export class CleanCacheTask extends Task{

    constructor(config: IConfig = {}){

        super(config);

        this.name = config.name || "web.clean.cache";

    }

    public async runner(){

        cache.clearAll();

        await utils.exec(`rm -rf ${ path.join(process.cwd(), "node_modules/.cache") }`);

    }

}
