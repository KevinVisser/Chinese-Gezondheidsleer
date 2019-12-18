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

    // GetAllData() {
    //     let stmt = db.prepare("Select Kruiden.Id, Kruiden.Nederlands, Kruiden.Latijns, KruidenFormules.Id, KruidenFormules.Naam, Symptomen.Id, Symptomen.Naam AS SymptoomNaam " +
    //     "FROM KruidenFormulesEnKruiden " +
    //     "INNER JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId=Kruiden.Id " +
    //     "INNER JOIN KruidenFormules ON KruidenFormulesEnKruiden.KruidenFormuleId=KruidenFormules.Id " +
    //     "INNER JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id=KruidenFormulesEnSymptomen.KruidenFormuleId " +
    //     "INNER JOIN Symptomen ON KruidenFormulesEnSymptomen.SymptoomId=Symptomen.Id");
    //     return stmt.all();
    // }

    GetKruidData(id) {
        let stmt = db.prepare("SELECT Kruiden.Id, Kruiden.Nederlands, Kruiden.Latijns FROM Kruiden " +
            "INNER JOIN KruidenFormulesEnKruiden ON Kruiden.Id=KruidenFormulesEnKruiden.KruidenId " +
            "WHERE KruidenFormulesEnKruiden.KruidenFormuleId = ?");

        return stmt.all(id);
    }

    GetSymptoomData(id) {
        let stmt = db.prepare("SELECT Symptomen.Id, Symptomen.Naam FROM Symptomen " +
            "INNER JOIN KruidenFormulesEnSymptomen ON Symptomen.Id=KruidenFormulesEnSymptomen.SymptoomId " +
            "WHERE KruidenFormulesEnSymptomen.KruidenFormuleId = ?");

        return stmt.all(id);
    }
}