class KruidenFormulesModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
            "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen  " +
            "FROM KruidenFormules " +
            "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
            "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
            "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
            "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
            "GROUP BY KruidenFormules.Id");
        return stmt.all();
    }

    GetSpecificData(id) {
        let stmt = db.prepare("SELECT Naam, Werking, Syndroom, ContraIndicatie FROM Kruidenformules WHERE Id = ?").get(id);
        return stmt;
    }

    GetKruidData(id) {
        let stmt = db.prepare("SELECT Kruiden.Nederlands, KruidenFormulesEnKruiden.Verhouding FROM Kruiden " +
            "INNER JOIN KruidenFormulesEnKruiden ON Kruiden.Id=KruidenFormulesEnKruiden.KruidenId " +
            "WHERE KruidenFormulesEnKruiden.KruidenFormuleId = ?");
        return stmt.all(id);
    }

    GetKruidenFormuleByNaam(name) {
        let stmt = db.prepare("SELECT * FROM KruidenFormules WHERE Naam = ?")

        let status = stmt.get(name);
        if (status === undefined) {
            return false;
        } else {
            return true;
        }
    }
}