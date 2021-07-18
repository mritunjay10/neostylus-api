const fs = require('fs');
const fileAsync = fs.promises;
const util = require('util')
const path = require('path');
const download = require('download');

const writeFile = util.promisify(fs.writeFile);

class S3{

  async downloadMedia(url){

    try{

      const filename = path.basename(url);
      const ext = path.extname(url);
      const folder = path.basename(filename, ext);

      const folderExist = fs.existsSync(`${process.env.LOCAL_MEDIA}${folder}`);
      if (!folderExist){
        await fileAsync.mkdir(`${process.env.LOCAL_MEDIA}${folder}`);
      }

      const fileExist = fs.existsSync(`${process.env.LOCAL_MEDIA}${folder}/${filename}`);

      if(!fileExist){

        const buffer = await download(url);

        await writeFile(`${process.env.LOCAL_MEDIA}${folder}/${filename}`,
          buffer, );
      }

      return { status: true, directory: folder, file: filename };

    }
    catch (e){

      console.log(e.message)
      return { status: false, directory: null, file: null };
    }
  }
}

module.exports = S3;