const router = require("express").Router();
const { dailynews } = require("../script/dialynews");

router.get("/", async (req, res) => {
    try {
        const result = await dailynews();
        return res.send(result);
    } catch (error) {
        return res.status(404).send(error);
    }
});

module.exports = router;
