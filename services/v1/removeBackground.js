const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const IMAGE_PATH = 'images_processed';
const URL = "https://api.slazzer.com/v2.0/remove_image_background";

const removeBG = async (req, reply) => {
  let respMessage = {
    message: '',
    error: null,
    code: ''
  }
  try {
    const data = await req.file();
    const imageBuffer = await data.toBuffer();

    // save input image to disk
    fs.writeFileSync(`${IMAGE_PATH}/input_${data.filename}`, imageBuffer);

    const formData = new FormData()
    formData.append('source_image_file', fs.createReadStream(`${IMAGE_PATH}/input_${data.filename}`));

    const resp = await axios.post(URL,
      formData,
      {
        headers: {
       ...formData.getHeaders(),
        'encoding': null,
        'API-KEY': process.env.API_KEY
      },
      responseType: 'arraybuffer',
    });

    if (resp.status === 200) {
      const outputImage = Buffer.from(resp.data);

      // store output image to disk
      fs.writeFileSync(`${IMAGE_PATH}/_output_${data.filename}`, outputImage);

      respMessage = {
        message: 'Image background removed successfully',
        code: 'SUCCESS',
        image: outputImage
      }

    } else {
      respMessage = {
        error: resp.error,
        message: 'Error removing background image, try again!',
        code: 'FAILURE'
      }
      req.log.error(resp.error);
    }
  } catch (error) {
    respMessage = {
      error: error,
      message: 'Internal server error',
      code: 'ERROR'
    }
    req.log.error(error);
  }

  reply.send(respMessage);
}

module.exports = removeBG;
