class SymptomenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT * FROM Symptomen");
        return stmt.all();
    }

    GetSpecificKruidenFormuleSymptomen(id) {
        let stmt = db.prepare("SELECT Symptomen.Naam FROM Symptomen " +
            "INNER JOIN KruidenFormulesEnSymptomen ON Symptomen.Id=KruidenFormulesEnSymptomen.SymptoomId " +
            "WHERE KruidenFormulesEnSymptomen.KruidenFormuleId=?");
        return stmt.all(id);
    }

    GetSymptoomData(id) {
        let stmt = db.prepare("SELECT Symptomen.Id, Symptomen.Naam FROM Symptomen " +
            "INNER JOIN PatentFormulesEnSymptomen ON Symptomen.Id=PatentFormulesEnSymptomen.SymptoomId " +
            "WHERE PatentFormulesEnSymptomen.PatentFormuleId = ?");
        return stmt.all(id);
    }

    GetKruidData(id) {
        let stmt = db.prepare("SELECT ChineseKruiden.Pinjin, ChineseKruidenEnPatentFormules.Verhouding FROM ChineseKruiden " +
            "INNER JOIN ChineseKruidenEnPatentFormules ON ChineseKruiden.Id=ChineseKruidenEnPatentFormules.KruidId " +
            "WHERE ChineseKruidenEnPatentFormules.PatentFormuleId = ?");
        return stmt.all(id);
    }
}