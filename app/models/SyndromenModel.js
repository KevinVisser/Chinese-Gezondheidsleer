class SyndromenModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Syndromen.Id, Syndromen.Syndroom AS Naam, Syndromen.Tong, Syndromen.Pols, group_concat(Symptomen.Naam, ', ') AS Symptoom " +
            "FROM SyndromenEnSymptomen " +
            "INNER JOIN Syndromen ON SyndromenEnSymptomen.SyndroomId=Syndromen.Id " +
            "INNER JOIN Symptomen ON SyndromenEnSymptomen.SymptoomId=Symptomen.Id " +
            "GROUP BY Syndromen.Id");
        return stmt.all();
    }

    GetSpecificData(id) {
        let stmt = db.prepare("SELECT Syndroom AS Naam, Hoofdsymptoom, Tong, Pols, Actie, Acupunctuurpunten FROM Syndromen WHERE Id = ?").get(id);
        return stmt;
    }

    GetSymptoomData(id) {
        let stmt = db.prepare("SELECT Symptomen.Id, Symptomen.Naam FROM Symptomen " +
            "INNER JOIN SyndromenEnSymptomen ON Symptomen.Id=SyndromenEnSymptomen.SymptoomId " +
            "WHERE SyndromenEnSymptomen.SyndroomId = ?");
        return stmt.all(id);
    }

    GetFormules(id) {
        let stmt = db.prepare("SELECT PatentFormules.Id AS patentId, PatentFormules.Pinjin, KruidenFormules.Id AS kruidId, KruidenFormules.Naam " +
        "FROM ActieFormules " +
        "LEFT JOIN PatentFormules ON ActieFormules.PatentFormuleId = PatentFormules.Id " +
        "LEFT JOIN KruidenFormules ON ActieFormules.KruidenFormuleId = KruidenFormules.Id " +
        "WHERE SyndroomId = ?");
        return stmt.all(id);
    }
}