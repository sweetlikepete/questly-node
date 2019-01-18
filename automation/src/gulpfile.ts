

import gulp from "gulp";

import Automation from "./index";


const automation = new Automation({
    project: "sweetlikepete777"
});

gulp.task("lint", () => {

    console.log(automation);

});
