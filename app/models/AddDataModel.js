class AddDataModel {
    constructor() { }

    InsertIntoKruiden(kruid) {
        let stmt = db.prepare('INSERT INTO Kruiden (Nederlands, Latijns, Familie, Inhoudsstoffen, Toepassing, Eigenschappen, Actie, Gebruik, LetOp, Smaak, Dosering, ThermischeWaarde, GebruikteDelen, Orgaan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const info = stmt.run(kruid.Nederlands, kruid.Latijns, kruid.Familie, kruid.Inhoudsstoffen, kruid.Toepassing, kruid.Eigenschappen, kruid.Actie, kruid.Gebruik, kruid.LetOp, kruid.Smaak, kruid.Dosering, kruid.ThermischeWaarde, kruid.GebruikteDelen, kruid.Orgaan);

        console.log(info.lastInsertRowid);
    }

    InsertIntoKruidenFormules(kruidenformule) {
        let stmt = db.prepare('INSERT INTO KruidenFormules (Naam, Werking, ContraIndicatie) VALUES (?, ?, ?)');
        const info = stmt.run(kruidenformule.Naam, kruidenformule.Werking, kruidenformule.ContraIndicatie);

        console.log(info);
        return info.lastInsertRowid;
    }

    InsertIntoKruidenFormuleEnKruiden(kruidenformuleId, selectedKruiden) {
        console.log(selectedKruiden);
        const insert = db.prepare('INSERT INTO KruidenFormulesEnKruiden (KruidenFormuleId, KruidenId) VALUES (?, @Id)')

        for (const obj of selectedKruiden) {
            insert.run(kruidenformuleId, obj)
        }
    }

    InsertIntoKruidenFormuleEnSymptomen(kruidenformuleId, selectedSymptomen) {
        const insert = db.prepare('INSERT INTO KruidenFormulesEnSymptomen (KruidenFormuleId, SymptoomId) VALUES (?, @Id)')

        for (const obj of selectedSymptomen) {
            insert.run(kruidenformuleId, obj)
        }
    }

}