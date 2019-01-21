

import path from "path";

import { Task } from "../../../task";
import utils from "../../../utils";


interface IConfig {
    name?: string;
}


export class CleanBuildTask extends Task{

    constructor(config: IConfig = {}){

        super(config);

        this.name = config.name || "web.clean.build";

    }

    public async runner(){

        await utils.exec(`rm -rf ${ path.join(process.cwd(), "src/web/build") }`);

    }

}
