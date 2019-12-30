class ChineseKruidenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT Id, Pinjin, Engels FROM ChineseKruiden");
        return stmt.all();
    }
}