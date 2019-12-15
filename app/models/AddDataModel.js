class AddDataModel {
    constructor() { }

    InsertIntoKruiden(kruid) {
        let stmt = db.prepare('INSERT INTO Kruiden (Nederlands, Latijns, Familie, Inhoudsstoffen, Toepassing, Eigenschappen, Actie, Gebruik, LetOp, Smaak, Dosering, ThermischeWaarde, GebruikteDelen, Orgaan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const info = stmt.run(kruid.Nederlands, kruid.Latijns, kruid.Familie, kruid.Inhoudsstoffen, kruid.Toepassing, kruid.Eigenschappen, kruid.Actie, kruid.Gebruik, kruid.LetOp, kruid.Smaak, kruid.Dosering, kruid.ThermischeWaarde, kruid.GebruikteDelen, kruid.Orgaan);

        console.log(info.changes);
    }


}