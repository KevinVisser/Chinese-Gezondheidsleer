class ChineseKruidenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT Id, Pinjin, Engels FROM ChineseKruiden");
        return stmt.all();
    }

    GetKruidByLatijn(name) {
        let stmt = db.prepare("SELECT * FROM ChineseKruiden WHERE Latijn = ?")

        let status = stmt.get(name);
        if (status === undefined) {
            return false;
        } else {
            return true;
        }
    }
}