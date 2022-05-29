const Cloth = require("../../model/Cloth");
const multer = require("multer");
const path = require("path");

function crudController() {
  let storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

  let upload = multer({ storage: storage }).single("image");

  return {

// Adding clothes
    add(req, res) {
      upload(req, res, async (err) => {
        let { name, brand, price, color, category } = req.body;
        if (!name || !brand || !price || !color || !category) {
          return res.status(422).json({
            message: "Required all the fields",
            success: false,
          });
        }
        const newCloth = new Cloth({
          name,
          brand,
          price,
          color,
          category,
          image: req.file.filename,
        });
        await newCloth.save();
        return res.status(201).json({
          message: "Cloth added successfully",
          success: true,
        });
      });
    },

// Updating cloth
    async update(req, res) {
        let { id } = req.params;
        let{ price } = req.body;
    
        if (!price) {
          return res.status(422).json({
            message: "Required all the fields",
            success: false,
          });
        }
   
        await Cloth.findByIdAndUpdate({_id: id},{
          $set : {
            price 
          }
        }, {
          new: true,
          useFindAndModify: false
        } );
        return res.status(201).json({
          message: "Price updated successfully",
          success: true,
        });
    },

// Deleting cloth 
    async delete(req, res) {
        let { id } = req.params;
        await Cloth.findByIdAndDelete({_id: id});
        return res.status(201).json({
          message: "Cloth removed successfully",
          success: true,
        });
    }


  };
}

module.exports = crudController;
