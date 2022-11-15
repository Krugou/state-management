'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./utils/pass');
const session = require('express-session');
const app = express();
const port = 3000;
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const username = 'foo';
const password = 'bar';

app.use(cookieParser());
app.use(session({ secret: 'salainensaalis', cookie: { maxAge: 90000 } })); // 90000 ms = 90 s
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  console.log('yhdistetty')
  res.render('home');
});
app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/form' }),
  (req, res) => {
    console.log('success');
    res.redirect('/secret');
  }
);





app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
app.get('/setCookie/:clr', (req, res) => {
  console.log(req.params.clr);
  res.cookie('color', req.params.clr).send('Eväste valmis ' + req.params.clr);
});

app.get('/getCookie', (req, res) => {
  console.log(req.cookies.color);
  res.send('Evästeen sisältö ' + req.cookies.color);
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('Eväste on poistettu');
});

app.listen(port, () =>
  console.log(`Hei, kuuntelen osoitteessa localhost:${port} <-- porttia!`)
);
console.log('              __ ');
console.log('             .¨  ¨. ');
console.log('             :      :');
console.log('             | _  _ |');
console.log('          .-.|(o)(o)|.-.        _._          _._');
console.log('         ( ( | .--. | ) )     .¨,_ ¨.      .¨ _,¨.');
console.log('          ¨-/ (    ) -¨     / /¨ `  __ / /¨ `  ');
console.log('           /   ¨--¨        / /     .¨  ¨./       ');
console.log('            `"===="` /     `-`     : _  _ :      `-`');
console.log('            `      /¨              |(o)(o)|');
console.log('              `  /¨                |      |');
console.log('              /`-.-`_             /         ');
console.log('        _..:;._/V_./:;.._       /   .--.    ');
console.log('      .¨/;:;:; /^ /:;:;:¨.     |  (    )  | ');
console.log('     / /;:;:;:;| |/:;:;:;:     _  ¨--¨  /__');
console.log('    / /;:;:;:;:;_/:;:;:;:;:  .¨  ¨-.__.-¨   `-.');
