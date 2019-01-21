

import { CleanTask } from "./tasks/clean";
import { CompressionTask } from "./tasks/compression";
import { DeployTask } from "./tasks/deploy";
import { LintTask } from "./tasks/lint";
import { LocalTask } from "./tasks/local";
import { WebpackTask } from "./tasks/webpack";


export default class Web{

    public clean: CleanTask;
    public compression: CompressionTask;
    public deploy: DeployTask;
    public lint: LintTask;
    public local: LocalTask;
    public webpack: WebpackTask;

    constructor(){

        this.clean = new CleanTask();
        this.compression = new CompressionTask();
        this.deploy = new DeployTask();
        this.lint = new LintTask();
        this.local = new LocalTask();
        this.webpack = new WebpackTask();

    }

}
