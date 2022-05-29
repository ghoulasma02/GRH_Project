module.exports = (req, res, next) => {
   
    if( (!req.user.role==='admin') ||(!req.user.role==='manager') ){
        return res.status(403).send('Your are not authorized.')
    }
      next();
  
};