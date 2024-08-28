const express = require("express");
const router = express.Router()
const dotenv = require('dotenv');
const moment = require('moment'); 
const CryptoJS = require('crypto-js'); 
const axios = require("axios").default
dotenv.config()

const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};
router.post('/config', async (req, res) => {

    const nhan = req.body
    const ur = req.body

    const embed_data = {
        redirecturl: `http://localhost:3000/`+ `${ur[0].product}`
     };
    const items = [{
       
    }];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "hellloooooo",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: nhan[0].price,
        description: `HHH-Book - Thanh toán zalopay`,
        bank_code: "zalopayapp",
        
        // 
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    
    try {
        const result = await axios.post(config.endpoint, null, { params: order })
        console.log(items)
        return res.status(200).json(result.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router