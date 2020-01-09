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

    GetSymptoomData(id) {
        let stmt = db.prepare("SELECT Symptomen.Id, Symptomen.Naam FROM Symptomen " +
            "INNER JOIN ChineseKruidenEnSymptomen ON Symptomen.Id=ChineseKruidenEnSymptomen.SymptoomId " +
            "WHERE ChineseKruidenEnSymptomen.ChineesKruidId = ?");

        return stmt.all(id);
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