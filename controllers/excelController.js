var excel = require('exceljs');
const excelType1 = require("../models/excelType1");
require('dotenv').config();
const colA = process.env.COLUMN_A

const insertRowOfExcelType1 = (row) => {
    try {
        const post = new excelType1({
            name: !!colA ? colA : row.name,
            ap: row.ap,
            am: row.am,
            curp: row.curp,
        });
        post.save();

    } catch (error) {
        res.send(error);
    }
}

const insertExcelFile = (req, res) => {
    try {
        var excelName = req.file.originalname;
        var workbook = new excel.Workbook();
        workbook.xlsx.readFile(req.file.path)
            .then(() => {
                try {
                    ws = workbook.getWorksheet("Hoja1");
                    var headers = ws.getRow(1).values;
                    var obj = {}
                    for (var i = 2; i <= ws._rows.length; i++) {
                        headers.forEach((item, index) => {
                            obj[item] = ws.getRow(i).values[index];
                        });
                        switch (excelName) {
                            case "excelType1.xlsx":
                                insertRowOfExcelType1(obj);
                                break;
                        }
                    }
                    res.send("ok");
                } catch (error) {
                    res.send(error);
                }
            });
    } catch (error) {
        res.send(error);
    }
}


module.exports =
{
    insertExcelFile
}