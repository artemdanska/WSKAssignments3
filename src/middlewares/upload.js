import sharp from 'sharp';
import path from 'path';

const createThumbnail = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log('error');
      return next();
    }

    const filePath = req.file.path;
    const fileExt = path.extname(filePath);
    const baseName = path.basename(filePath, fileExt);
    const dirName = path.dirname(filePath);

    const thumbPath = path.join(dirName, `${baseName}_thumb${fileExt}`);
    await sharp(filePath).resize(160, 160).toFormat('png').toFile(thumbPath);
    req.file.thumbnail = thumbPath;

    next();
  } catch (err) {
    console.error('Error creating thumbnail:', err);
    next(err);
  }
};

export {createThumbnail};
