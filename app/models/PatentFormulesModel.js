class PatentFormulesModel {
    constructor() { }

    GetRelevantData() {
        let array = [];
        // Meer AS keyword gebruiken voor de SELECT statement anders pakt pakt hij de laatste waarde 
        // --> patentformule.id = 1 | syndroom.id = 0  --> in de console wordt dit dan Id = null i.p.v. 1
        // Met AS keyword maak je er een andere waarde van (PatentFormules.Id AS PatentformuleID)
        let patentformuleData = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
            "FROM PatentFormules " +
            "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
            "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
            "GROUP BY PatentFormules.Id");

        // Array met alle patentformules
        array = patentformuleData.all();
        return array;
    }

    GetSpecificData(id) {
        let array = [];

        let patentformuleData = db.prepare("SELECT PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, group_concat(Symptomen.Naam, '\n') AS Symptomen " +
            "FROM PatentFormules " +
            "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
            "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
            "WHERE PatentFormules.Id = ? " +
            "GROUP BY PatentFormules.Id");

        // Array met alle patentformules
        array = patentformuleData.get(id);
        return array;
    }

    GetKruidData(id) {
        let stmt = db.prepare("SELECT ChineseKruiden.Pinjin, ChineseKruidenEnPatentFormules.Verhouding FROM ChineseKruiden " +
            "INNER JOIN ChineseKruidenEnPatentFormules ON ChineseKruiden.Id=ChineseKruidenEnPatentFormules.KruidId " +
            "WHERE ChineseKruidenEnPatentFormules.PatentFormuleId = ?");
        return stmt.all(id);
    }
}