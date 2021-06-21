const { app } = require("./app");

const start = async () => {
    app.listen(3000, () => {
        console.log(`listening on port 3000 !!`);
    });
};

start();
