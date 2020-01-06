class ChineseKruidenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT Id, Pinjin, Engels, Latijn, ThermischeWerking FROM ChineseKruiden");
        return stmt.all();
    }

    GetSpecificKruid(id) {
        let stmt = db.prepare("SELECT * FROM ChineseKruiden WHERE Id=?").get(id)
        return stmt;
    }
}