const jwt = require('jsonwebtoken');
const User = require('../Database/Register');
const multer = require('multer');

async function uploadImage(req, res) {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }else{

    let userEmail;

    const accessToken = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'accessSecretKey');
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    userEmail = decodedToken.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const storage = multer.memoryStorage();

    const upload = multer({ storage: storage }).single('profilePicture');

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
        res.status(400).json({ message: 'Image upload failed' });
        return;
      } else if (err) {
        console.error(err);
        res.status(400).json({ message: 'Image upload failed' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'No file received' });
        return;
      }

      user.profileImage = req.file.buffer;
      await user.save();

      res.json({ message: 'Image uploaded successfully' });
    });
  }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
}

module.exports = { uploadImage };
