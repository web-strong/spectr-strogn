const express = require('express');
const application = express();

module.exports = function(){
    return {
        listen:(port)=>{ application.listen(port) },
        use:(mount = "*",handler)=>{ application.use(mount,handler) }
    }
}