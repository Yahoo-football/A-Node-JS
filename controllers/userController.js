export const index = (req,res)=>{
    res.send('Here are products ...')
}
export const get=(req,res)=>{
    const id = req.params.id;
    res.send(`The ID of the product is:${id}`)
}
export const create=(req,res)=>{
    const body = req.body;
    res.json({
        message: 'Body received',
        body
    });
}
export const remove=(req,res)=>{
    const id = req.params.id;
    res.json({
        message: 'Product deleted',
        id
    });
}
