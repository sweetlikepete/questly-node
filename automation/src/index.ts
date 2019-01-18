

import Web from "./web";


interface IAutomationConfig {
    project: string;
}


export default class Automation{

    public web: Web;

    constructor(config: IAutomationConfig){

        this.web = new Web();

        if(!Boolean(config.project)){

            throw new Error("Automation instance was not initiated with a project.");

        }

    }

}
