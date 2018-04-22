const fs= require('fs-extra');
const path = require('path');


class StreamReaderService{

    static  streamFile(pathFile){        
        return  fs.createReadStream(path.join(process.env.NODE_PATH + pathFile));
    }

}


module.exports = StreamReaderService;