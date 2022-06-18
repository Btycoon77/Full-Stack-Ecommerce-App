module.exports = (theFunc)=>(req,res,next)=>{
        Promise.resolve(theFunc(req,res,next)).catch(next)// same like try catch async await;
}