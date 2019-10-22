var authController = require('../controllers/authcontroller.js');


module.exports = function(app, passport) {


    app.get('/signup', authController.signup);


    app.get('/signin', authController.signin);


    app.get('/partners', authController.partners);

    app.get('/landos', authController.landos);


    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/',
            failureRedirect: '/' }));

    app.get('/auth/vkontakte',
        passport.authenticate('vkontakte'),
        function(req, res){
            // The request will be redirected to vk.com for authentication, so
            // this function will not be called.
        });

    app.get('/auth/vkontakte/callback',
        passport.authenticate('vkontakte', { failureRedirect: '/' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('/', authController.main);

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',

            failureRedirect: '/signup'
        }

    ));

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/',

            failureRedirect: '/signin'
        }

    ));

    function black(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.status(400).json({
            'message': 'access denied'
        });
    }

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

}