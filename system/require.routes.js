/**
 * Copyright (c) 2019-present, web-strong.com
 * Autor: Aleksandr Chaplyga
 * License: MIT
 * Project: https://github.com/web-strong/express-boilerplate
 * Description: loader for express routers
 * @emails info@web-strong.com
 */
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const routesPath = path.join(process.mainModule.path,'routes');

const [
    COLOR_YELLOW,
    COLOR_RESET
] = [
    YELLOW = `\x1b[33m`,
    RESET = `\x1b[0m`
];

function readRoutesDirectory(dirpath){
    let list = fs.readdirSync(dirpath);
    list = list.sort((a,b)=> b.indexOf('.') - a.indexOf('.') );

    for(let item of list){
        
        let isDirectory = fs.lstatSync( path.join(dirpath,item) ).isDirectory();
        let isFile = fs.lstatSync( path.join(dirpath,item) ).isFile();
        
        if(isFile){
            let [filemount,extention] = item.split('.');
            let filemodule = path.join(dirpath,item);
            let routemodule = require(filemodule);

            if(typeof routemodule !== 'function'){
                process.stdout.write(`${COLOR_YELLOW}route module must be a function \n`);
                process.stderr.write(`${COLOR_YELLOW}not mount ${filemount} ${filemodule} \n`);
                process.stdout.write(`${COLOR_RESET}`);                
            }

            if(typeof routemodule === 'function'){
                let rootmount = dirpath.slice(routesPath.length).replace(/\\/ig,'/');
                let mountpath = filemount === 'index' ? `${rootmount}/` : `${rootmount}/${filemount}`;
                process.stdout.write(`mount file ${filemount}.${extention} on path ${mountpath}, module path ${filemodule} \n`);
                router.use( mountpath,routemodule );
            }
        }

        if(isDirectory){
            let nextpath = path.join(dirpath,item);
            readRoutesDirectory(nextpath);
        }

    }    
}

readRoutesDirectory(routesPath);

module.exports = router;