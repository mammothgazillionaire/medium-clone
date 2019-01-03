module.exports = {
  isLgggedin : (req,res,next) => {
    if(req.user){
      return next();
    }else{
      res.status(400).send({"message": "please login"})
    }
  } 
}