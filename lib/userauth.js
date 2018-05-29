module.exports = {
    staleCookieLogout: (req, res, next) => {
        if (req.cookies.TrelloSession && !req.session.user) {
            res.clearCookie('TrelloSession');
        }
        next();
    },
    checkUser: (req, res, next) => {

    }
};