

import Clean from "./tasks/clean";
import Compression from "./tasks/compression";
import Deploy from "./tasks/deploy";
import Lint from "./tasks/lint";
import Local from "./tasks/local";
import Webpack from "./tasks/webpack";


export default class Web{

    public clean: Clean;
    public compression: Compression;
    public deploy: Deploy;
    public lint: Lint;
    public local: Local;
    public webpack: Webpack;

    constructor(){

        this.clean = new Clean();
        this.compression = new Compression();
        this.deploy = new Deploy();
        this.lint = new Lint();
        this.local = new Local();
        this.webpack = new Webpack();

    }

}


/* import Clean from "./tasks/clean";
import Compression from "./tasks/compression";
import Deploy from "./tasks/deploy";
import Lint from "./tasks/lint";
import Local from "./tasks/local";
import Webpack from "./tasks/webpack";


export default class Web{

    constructor(){

        this.clean = new Clean();
        this.compression = new Compression();
        this.deploy = new Deploy();
        this.local = new Local();
        this.lint = new Lint();
        this.webpack = new Webpack();

    }

} */