const { Router } = require("express");
const { fork } = require("child_process");
const router = Router();

router.get("/randoms", (req, res) => {
    const cant = req.query.cant || 1e8;
    const result = fork("./routes/getRandomObject.js");
    result.send(cant);
    result.on("message", (result) => {
        return res.json(result);
    });
});

module.exports = router;
