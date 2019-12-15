class PatentFormulesModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Id, Nederlands, Engels, Pinjin FROM PatentFormules");
        return stmt.all();
    }

    GetSpecificData(id) {
        let stmt = db.prepare("SELECT * FROM PatentFormules WHERE Id=?");
        return stmt.get(id);
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