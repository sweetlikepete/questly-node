

import { LintTask } from "./tasks/lint";


export default class Base{

    public lint: LintTask;

    constructor(){

        this.lint = new LintTask();

    }

}
