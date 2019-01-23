

import fs from "fs";
import cache from "gulp-cache";
import eslint from "gulp-eslint";
import gulpIf from "gulp-if";
import { PackageJson } from "package-json";
import path from "path";
import print from "gulp-print";
import through from "through2";
import touch from "touch";
import vinyl from "vinyl";
import { IRunnerArgs, Task } from "../../../../task";


const baseConfigPath = path.join(__dirname, "../../../config/eslint.js");
const userConfigPath = path.join(process.cwd(), ".eslintrc.js");

const conf = {
    cache: true,
    // This is ok because it only happens during the build
    // eslint-disable-next-line no-sync
    configFile: fs.existsSync(userConfigPath) ? userConfigPath : baseConfigPath,
    fix: true,
    warnFileIgnored: true
};

// This is ok because it only happens during the build
// eslint-disable-next-line no-sync
const eslintOptionsString = fs.readFileSync(conf.configFile);
// JSON.parse returns type any, what you gonna do?
// tslint:disable-next-line: no-unsafe-any
const packageJson: PackageJson = JSON.parse(
    // This is ok because it only happens during the build
    // eslint-disable-next-line no-sync
    fs.readFileSync(path.join(process.cwd(), "package.json"))
    .toString()
);
const devDependencies = packageJson.devDependencies || {};
const eslintVersionString = Object.keys(devDependencies)
.filter(key => key.startsWith("eslint"))
.map(key => `${ key }=${ devDependencies[key] }`)
.join(",");


export class LintJSTask extends Task{

    public runner(args: IRunnerArgs){

        // Returns true if eslint has made any automatic fixes to a file
        const fixed = (file: vinyl) => Boolean(
            conf.fix &&
            file.eslint &&
            // This is safe since we're checking if the object exists first
            // tslint:disable-next-line: no-unsafe-any
            file.eslint.fixed
        );

        return this.src(args.globs || this.globs)
        .pipe(print(p => `Lint: ${ p }`))
        // Cache if not watching
        .pipe(args.watching ? eslint(conf) : cache(eslint(conf), {
            // Cache key based on the file contents, eslint + plugin versions and eslint options
            key: file => `${ (file.contents || "").toString("utf8") }${ eslintVersionString }${ eslintOptionsString }`,
            // Gulp-cache doesn't type this correctly, it's actually a vinyl file which will have an eslint property
            // tslint:disable-next-line: no-unsafe-any
            success: file => file.eslint.errorCount === 0,
            // Gulp-cache doesn't type this correctly, it's actually a vinyl file which will have an eslint property
            // tslint:disable-next-line: no-unsafe-any
            value: file => ({ eslint: file.eslint })
        }))
        .pipe(eslint.format("codeframe", this.fail.bind(this)))
        .pipe(gulpIf(fixed, this.dest(".")))
        .pipe(through.obj(async (file: vinyl, encoding, callback) => {

            // If the file was fixed, we need to manually touch it so that it updates in our editor
            if(fixed(file)){

                await touch(file.path);

            }

            callback(undefined, file);

        }))
        .pipe(args.watching ? this.skip() : eslint.failAfterError());

    }

}
