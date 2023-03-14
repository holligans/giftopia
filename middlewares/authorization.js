const authorization = (req,res, next) => {
    const {token} = req.query;
    req.authorization = !!token;
    console.log("authorization",req.url, req.authorization);
    next();
};

module.exports = authorization;