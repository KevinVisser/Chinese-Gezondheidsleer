class SyndromenModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Syndromen.Id, Syndromen.Syndroom, Syndromen.Tong, Syndromen.Pols, group_concat(Symptomen.Naam, ', ') AS Symptoom " +
            "FROM SyndromenEnSymptomen " +
            "INNER JOIN Syndromen ON SyndromenEnSymptomen.SyndroomId=Syndromen.Id " +
            "INNER JOIN Symptomen ON SyndromenEnSymptomen.SymptoomId=Symptomen.Id " +
            "GROUP BY Syndromen.Id");
        return stmt.all();
    }

    // GetRelevantData() {
    //     let stmt = db.prepare("SELECT Id, Syndroom, Tong, Pols FROM Syndromen");
    //     return stmt.all();
    // }

    GetSymptoomData(id) {
        let stmt = db.prepare("SELECT Symptomen.Id, Symptomen.Naam FROM Symptomen " +
            "INNER JOIN SyndromenEnSymptomen ON Symptomen.Id=SyndromenEnSymptomen.SymptoomId " +
            "WHERE SyndromenEnSymptomen.SyndroomId = ?");
        return stmt.all(id);
    }
}