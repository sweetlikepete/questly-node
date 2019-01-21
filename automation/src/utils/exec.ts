

import chalk from "chalk";
import exec from "child_process";
import log from "fancy-log";


export default async function run(
    command: string | Array<string>
){

    await new Promise((
        resolve: (
            stdout: string | Buffer
        ) => void,
        reject: (
            error: exec.ExecException,
            stderr: string | Buffer
        ) => void
    ) => {

        let cmd = Array.isArray(command) ? command.join(" ") : command;

        cmd = cmd
        .replace(/(?:\r\n|\r|\n)/g, "")
        .replace(/\s\s+/g, " ");

        log(`${ chalk.yellow("[exec]") } ${ chalk.magenta(cmd) }`);

        const proc = exec.exec(cmd, undefined, (error, stdout, stderr) => {

            if(error){
                reject(error, stderr);
            }else{
                resolve(stdout);
            }

        });

        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);

    });

}
