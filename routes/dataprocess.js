const c2j = require('csvtojson');
const { Parser } = require('json2csv')

const processHandler = async (req, res) => {
    try {
        let csvArr = req.files.map(raw => raw.buffer.toString().replace(/\t/g, ","));
        let csvCount = csvArr.length;

        let jsonArr = [];
        let finalArr = [];

        let overallHeaders = [];
        let finalHeaders = [];

        for (let i = 0; i < csvCount; i++) {
            let data = await c2j().fromString(csvArr[i]);
            overallHeaders = overallHeaders.concat(Object.keys(data[0]));
            jsonArr = jsonArr.concat(data);
        }

        overallHeaders.forEach(header => {
            if (!(finalHeaders.includes(header))) {
                finalHeaders.push(header);
            }
        });

        jsonArr.forEach(data => {
            let keys = Object.keys(data);
            let existing = finalArr.find(o => o["Email"].toLowerCase() === data["Email"].toLowerCase());
            if (existing) {
                finalHeaders.forEach((text) => {
                    if (text === "Registration Time") {
                        existing[text] += ", " + data[text];
                    } else {
                        existing[text] = data[text] || existing[text];
                    }
                });
            } else {
                finalHeaders.forEach((text) => {
                    if (!(keys.includes(text))) {
                        data[text] = ""
                    }
                });
                finalArr.push(data);
            }
        });

        const parser = new Parser();
        const csv = parser.parse(finalArr);

        res.send(csv);
    } catch (err) {
        res.status(500).send("SERVER_FAIL");
    }
}

module.exports = processHandler;