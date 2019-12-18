class PatentFormulesModel {
    constructor() { }

    GetRelevantData() {
        let array = [];
        // Meer AS keyword gebruiken voor de SELECT statement anders pakt pakt hij de laatste waarde 
        // --> patentformule.id = 1 | syndroom.id = 0  --> in de console wordt dit dan Id = null i.p.v. 1
        // Met AS keyword maak je er een andere waarde van (PatentFormules.Id AS PatentformuleID)
        let patentformuleData = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, PatentFormulesEnSymptomen.PatentFormuleId, PatentFormulesEnSymptomen.SymptoomId, Symptomen.Naam, group_concat(Symptomen.Naam, ', \n') AS ConcatSymptomen " +
            "FROM PatentFormules " +
            "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
            "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
            "GROUP BY PatentFormules.Id");

        // Array met alle patentformules
        array = patentformuleData.all();
        return array;
        // const patentformuleEnSymptomen = db.prepare('SELECT * FROM PatentFormulesEnSymptomen');


        // for (var row of patentformuleData.all()) {
        //     // Elke row kijken van de patentformules welke symptomen erbij passen van de kruistabel
        //     let id = row.Id;
        //     let stmt = db.prepare

        //     console.log(id);
        //     // array.symptomen
        // }

        // const stmt = db.prepare("SELECT ChineseKruiden.Pinjin, ChineseKruidenEnPatentFormules.Verhouding FROM ChineseKruiden " +
        //     "INNER JOIN ChineseKruidenEnPatentFormules ON ChineseKruiden.Id=ChineseKruidenEnPatentFormules.KruidId " +
        //     "WHERE ChineseKruidenEnPatentFormules.PatentFormuleId = ?");
        // return stmt.all();
    }

    GetSpecificData(id) {
        let array = [];

        let patentformuleData = db.prepare("SELECT PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, group_concat(Symptomen.Naam, ', \n') AS ConcatSymptomen FROM PatentFormules " +
            " LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
            " LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
            " WHERE PatentFormules.Id = ?" +
            " GROUP BY PatentFormules.Id");

        // Array met alle patentformules
        array = patentformuleData.get(id);
        console.log(array);
        return array;

        let stmt = db.prepare("SELECT * FROM PatentFormules WHERE Id=?");
        return stmt.get(id);
    }

    GetSymptoomData(id) {
        let stmt = db.prepare("SELECT Symptomen.Naam FROM Symptomen " +
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