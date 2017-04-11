const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	path = require('path'),
	data = require('../data/');

let conf = (passport) => {

	passport.use(new LocalStrategy(
		(username, password, done) => {
		

			let result = data.verification(username, password);

			if (result.status)
				return done(null, result.message);

			return done(null, false, {
				message: result.message
			});
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {

		let data1 = user.split(' ');
		if (data1.length != 2)
			return done(null, false, {
				message: "Invalid"
			});

		let uname = data1[0];
		let pwd = data1[1];

		let output = data.verification(uname, pwd);

		if (output.status)
			return done(null, output.message);

		return done(null, false, {
			message: output.message
		});
	});
}

conf(passport);


let routes = (app) => {

	app.use(passport.initialize());
	app.use(passport.session());


	app.get('/', (req, res) => {
		
		if (req.isAuthenticated()) {
			res.redirect(301, '/private/');
		} else {
			res.redirect(301, '/login/')
		}
	})



	app.get('/private', (req, res) => {

		if (req.isAuthenticated()) {
			let uname = req.user.split(' ')[0];
			let udata = data.getUser(uname);
			res.render('private.handlebars', {
				username: uname,
				alias: udata.alias,
				firstName: udata.firstName,
				lastName: udata.lastName,
				profession: udata.profession,
				bio: udata.bio
			});
		} else {
			res.redirect(301, '/login');
		}

	})
		app.post('/login', passport.authenticate('local', {
		successRedirect: '/private',
		failureRedirect: '/',
		failureFlash: true,
		successFlash: 'Done'
	}));

	app.get('/login', (req, res) => {
		if (!req.isAuthenticated()) {
			if (req.session.flash && req.session.flash.error) {
				res.render('login.handlebars', {
					error: true,
					message: req.session.flash.error.slice(-1)[0]
				});
				return
			}
			res.render('login.handlebars', {
				error: false
			});
		} else {
			res.redirect(301, '/private/');
		}
	});



}

module.exports = routes