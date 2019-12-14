class PatentFormulesModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Id, Nederlands, Engels, Pinjin FROM PatentFormules");
        return stmt.all();
    }

    GetSymptoomData(id) {
        let stmt = db.prepare("SELECT Symptomen.Id, Symptomen.Naam FROM Symptomen " + 
        "INNER JOIN PatentFormulesEnSymptomen ON Symptomen.Id=PatentFormulesEnSymptomen.SymptoomId " + 
        "WHERE PatentFormulesEnSymptomen.PatentFormuleId = ?");
        return stmt.all(id);
    }
}