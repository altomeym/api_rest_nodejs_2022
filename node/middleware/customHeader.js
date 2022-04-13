const customHeader = (req, res, next) => {
    try {
        /* console.log('HEADERS DE LA PETICIÓN', req.headers)
        console.log('BODY DE LA PETICIÓN', req.body) */
        const apiKey = req.headers.api_key
        if(apiKey === 'petrix12') {
            next()
        } else {
            res.status(403)
            res.send({error: 'API_KEY_NO_ES_CORRECTA'})
        }
    } catch(e) {
        res.status(403)
        res.send({error: 'ALGO_OCURRIO_EN_EL_CUSTOM_HEADER'})
    }
}

module.exports = customHeader