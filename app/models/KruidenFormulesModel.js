class KruidenFormulesModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("Select Id, Naam FROM KruidenFormules");
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