const express = require("express");
const router = express.Router();
const fs= require("fs").promises;
const path = require("path");

const ImagenModel = require("../models/image.js");
//routes


//Ruta a la raíz de la aplicación
router.get("/", async(req, res)=>{
    const imagenes = await ImagenModel.find();

    const nuevoArrayImagenes = imagenes.map(imagen => {
        return {
            id: imagen._id,
            title: imagen.title,
            description: imagen.description,
            filename: imagen.filename,
            path: imagen.path
        }
    })

    res.render("index", {imagenes: nuevoArrayImagenes});
});

//Ruta para formulario y cargar imagenes
router.get("/upload", (req, res)=> {
    res.render("upload");
})

//Ruta para enviar el formulario
router.post("/upload", async (req, res)=> {
    const imagen = new ImagenModel();
    imagen.title = req.body.title;
    imagen.description = req.body.description;
    imagen.filename = req.file.filename;
    imagen.path = "/img" + req.file.filename;

    //guardar en la BD
    await imagen.save()


    res.redirect("/")
})

//eliminar iamgenes
router.get("/image/:id/delete", async(req, res)=>{
    const {id} = req.params;
    //Borrar la imagen y guardar una referencia
    const imagen= await ImagenModel.findByIdAndDelete(id);
    //borrar la imagen del almacenamiento en el servidor
    await fs.unlink(path.resolve("./src/public"+ imagen.path));
    res.redirect("/");
})
module.exports = router;
