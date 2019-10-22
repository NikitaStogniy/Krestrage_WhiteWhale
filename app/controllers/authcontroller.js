var exports = module.exports = {}


exports.signup = function(req, res) {

    if (!req.isAuthenticated()) {
        res.render("signup");
    }

    else{
        res.redirect("/");
    }

}

exports.landos = function(req, res) {

    if (!req.isAuthenticated()) {
        res.render("landos", {
            userAuth: 0
        });
    }

    else{
        res.render("landos", {
            userAuth: 1
        });
    }

}

exports.partners = function(req, res) {

    if (!req.isAuthenticated()) {
        res.render("partners", {
            userAuth: 0
        });
    }

    else{
        res.render("partners", {
            userAuth: 1
        });
    }

}

exports.signin = function(req, res) {

    if (!req.isAuthenticated()) {
        res.render("signin");
    }

    else{
        res.redirect("/");
    }

}

exports.main = function(req, res) {
    if (!req.isAuthenticated()) {
        res.render("index", {
            adBoxImg: ["https://jolybell.com/storage/211v3fbj7d.png?id=cqkq59vsmm", "https://jolybell.com/storage/88ahykwqx8.png?id=cqkq59vsmm", "https://jolybell.com/storage/4ph1bvroa5.png?id=cqkq59vsmm", "https://jolybell.com/storage/3z7hyxd15u.png?id=cqkq59vsmm"],
            adBoxSrc: ["https://jolybell.com/full/43#", "https://jolybell.com/full/45#", "https://jolybell.com/full/21#", "https://jolybell.com/full/50#"],
            adBoxName: ["JOLY.SHIRT Black", "JOLY.SHIRT White", "JOLY.POLO White", "Black"],
            userAuth: 0
        });
    }

    else{
        res.render("index", {
            adBoxImg: ["https://jolybell.com/storage/211v3fbj7d.png?id=cqkq59vsmm", "https://jolybell.com/storage/88ahykwqx8.png?id=cqkq59vsmm", "https://jolybell.com/storage/4ph1bvroa5.png?id=cqkq59vsmm", "https://jolybell.com/storage/3z7hyxd15u.png?id=cqkq59vsmm"],
            adBoxSrc: ["https://jolybell.com/full/43#", "https://jolybell.com/full/45#", "https://jolybell.com/full/21#", "https://jolybell.com/full/50#"],
            adBoxName: ["JOLY.SHIRT Black", "JOLY.SHIRT White", "JOLY.POLO White", "Black"],
            userAuth: 0
        });
    }
}

exports.logout = function(req, res) {

    req.session.destroy(function(err) {

        res.redirect('/');

    });

}
