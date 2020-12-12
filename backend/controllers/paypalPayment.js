var braintree = require("braintree");



var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'gmhpr3s9ypmqn49y',
  publicKey: 'dtcq5qbd9m2kwkg7',
  privateKey: "ee15775f23ebc5e11bd8ba00ec9a0e76",
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).json(err)
        }else{
            res.send(response)
        }
      })
}

exports.processPayment = (req,res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(error)
          }else{
              res.json(result)
          }
      });
}