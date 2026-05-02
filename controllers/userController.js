export const index = (req,res)=>{
    res.send('Here are products ...')
}
export const get=(req,res)=>{
    const id = req.params.id;
    res.send(`The ID of the product is:${id}`)
}
export const create=(req,res)=>{
    res.send()
}