const express = require('express')
const router = express.Router()
const jurnal = require('../Controller/jurnalController')
const check = require('./tokenChecker')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Public/File');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.judul + req.body.penulis + req.body.tahun_publikasi + '.' + 'pdf');
  }
});


const upload = multer({ storage: storage },
  {
    fileFilter: function (req, file, cb) {
      if (path.extension(file.originalname) !== '.pdf') {
        return cb(new Error('Only pdfs are allowed'))
      }

      cb(null, true)
    }
  });


router.get('/', jurnal.gets);
router.get('/:id', jurnal.get);
router.post("/", check, upload.single('file'), jurnal.store);
router.put("/:id", check, upload.single('file'), jurnal.update);
router.delete('/:id', check, jurnal.delete)

module.exports = router;