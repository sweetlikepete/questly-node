

import Base from "./base";
import Web from "./web";


interface IAutomationConfig {
    project: string;
}


export default class Automation{

    public base: Base;
    public web: Web;

    constructor(config: IAutomationConfig){

        this.base = new Base();
        this.web = new Web();

        if(!Boolean(config.project)){

            throw new Error("Automation instance was not initiated with a project.");

        }

    }

}
