const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = (app) => {
    /* 가상 데이터 */
    let fakeUser = {
        username: 'qwer',
        password: 'qwer1234'
    }

    app.use(cookieParser('passportExample'));
    app.use(session({
        resave: true,              // 수정 false->true
        saveUninitialized: true,   // 수정 false->true
        secret: 'passportExample',
        cookie: {
            httpOnly: true,
            secure: false
        }
    }));

    /* passport middleware */
    app.use(passport.initialize()); // passport 초기화
    app.use(passport.session()); // passport session 연동

    // 세션 처리 - 로그인에 성공했을 경우 딱 한번 호출되어 사용자의 식별자를 session에 저장
    passport.serializeUser(function (user, done) {
        console.log('serializeUser', user);
        done(null, user.username);
    });

    // 세션 처리 - 로그인 후 페이지 방문 마다 사용자의 실제 데이터 주입
    passport.deserializeUser(function (id, done) {
        console.log('deserializeUser', id);
        done(null, fakeUser); // req.user에 전달
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            if (username === fakeUser.username) { // username OK
                if (password === fakeUser.password) { // password OK
                    return done(null, fakeUser);
                } else {
                    return done(null, false, { message: "password incorrect" });
                }
            } else {
                return done(null, false, { message: "username incorrect" });
            }
        }
    ));

    /* 라우터 설정 */
    /* Passport Login : Strategy-Local */
    /* Authenticate Requests */
    app.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
          // err는 서버의 에러
            if (err) {
                console.error(err);
                return next(err);
            }
          // info는 로직 상의 에러
            if (info) {
                console.log(req.isAuthenticated());
                return res.send({code:0});
            }
          // 위의 모든 에러가 없다면 로그인 성공
          // req.login을 하면 서버쪽에 세션과 쿠키로 저장이 된다.
            return req.login(user, (loginErr) => {
            // loginErr가 터지면 next로 보내버리고
                if (loginErr) return next(loginErr);
            // 정상적이라면 비밀번호를 제외한 유저 정보를 클라이언트에게 보낸다.
                console.log(req.isAuthenticated());
                return res.send({code: 1});
            });       
        })(req,res,next); //미들웨어 내의 미들웨어에는 (req,res,next)를 붙인다.
      });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /* 404 에러처리 */
     /* 에러처리 미들웨어 */
     /*
    app.use((req, res, next) => {
        const error = new Error(`${req.method} ${req.url} 해당 주소가 없습니다.`);
        error.status = 404;
        next(error);
    });

   
    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
        res.status(err.status || 500);
        res.send('error Occurred');
        next(err);
    });
    */

}