

import exec from "./exec";


export default async function kill(str: string){

    await exec([
        "ps -ax",
        "|",
        `grep '[${ str[0] }]${ str.substring(1, str.length) }'`,
        "|",
        "awk '{print $1}'",
        "|",
        "xargs kill -9"
    ]);

}
