const Movies = require("../Model/movie.model");
const path = require("path");
const fs = require('fs')

exports.getAllmovie = async (req, res) => {
    try {
        let movies = await Movies.find();

        return res.render('index', { movies });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

// exports.addNewmovie = async (req, res) => {
//     try {
//         let movie = await Movies.create(req.body)
//         // console.log("Movies ", movie);
//         return res.redirect("/");
//     } catch (error) {
//         console.log(error);
//         return res.redirect("/");
//     }
// };

exports.addMoive = async (req, res) => {
    try {
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }

        console.log(imagepath);
        let moive = await Movies.create({
            ...req.body,
            image: imagepath
        })
        return res.redirect('/')

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        let id = req.params.id;
        let movie = await Movies.findById(id);

        if (movie.image != '') {
            let filepath = path.join(__dirname, '..', movie.image);
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log("Movie Not Found");
            }
        }
        await Movies.findByIdAndDelete(id);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.editMovie = async (req, res) => {
    try {
        let movie = await Movies.findById(req.params.id);
        if (!movie) {
            console.log('Movie Not Found');
            return res.redirect("/");
        }
        return res.render('editMovie', { movie })
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movies.findById(req.params.id);

        if (!movie) {
            console.log("Movie Not Found");
            return res.redirect("/");
        }

        let filepath = movie.image;

        if (req.file) {
            if (movie.image != '') {
                let oldpath = path.join(__dirname, '..', movie.image)
                try {
                    await fs.unlinkSync(oldpath)
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`
        }
        await Movies.findByIdAndUpdate(req.params.id, { ...req.body, image: filepath }, { new: true });
        return res.redirect('/')

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}