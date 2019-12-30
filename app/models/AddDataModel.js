class AddDataModel {
    constructor() { }

    // Kruiden
    InsertIntoKruiden(kruid) {
        console.log(db.open, db.inTransaction, db.name, db.memory, db.readonly);
        console.log(kruid);
        let stmt = db.prepare('INSERT INTO Kruiden (Nederlands, Latijns, Familie, Inhoudsstoffen, Toepassing, Eigenschappen, Actie, Gebruik, LetOp, Smaak, Dosering, ThermischeWaarde, GebruikteDelen, Orgaan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const info = stmt.run(kruid.Nederlands, kruid.Latijns, kruid.Familie, kruid.Inhoudsstoffen, kruid.Toepassing, kruid.Eigenschappen, kruid.Actie, kruid.Gebruik, kruid.LetOp, kruid.Smaak, kruid.Dosering, kruid.ThermischeWaarde, kruid.GebruikteDelen, kruid.Orgaan);

        console.log(info.lastInsertRowid);
    }

    // KruidenFormules
    InsertIntoKruidenFormules(kruidenformule) {
        let stmt = db.prepare('INSERT INTO KruidenFormules (Naam, Werking, ContraIndicatie) VALUES (?, ?, ?)');
        const info = stmt.run(kruidenformule.Naam, kruidenformule.Werking, kruidenformule.ContraIndicatie);

        console.log(info);
        return info.lastInsertRowid;
    }

    InsertIntoKruidenFormulesEnKruiden(kruidenformuleId, selectedKruiden) {
        console.log(selectedKruiden);
        const insert = db.prepare('INSERT INTO KruidenFormulesEnKruiden (KruidenFormuleId, KruidenId) VALUES (?, @Id)')

        for (const obj of selectedKruiden) {
            insert.run(kruidenformuleId, obj)
        }
    }

    InsertIntoKruidenFormulesEnSymptomen(kruidenformuleId, selectedSymptomen) {
        const insert = db.prepare('INSERT INTO KruidenFormulesEnSymptomen (KruidenFormuleId, SymptoomId) VALUES (?, @Id)')

        for (const obj of selectedSymptomen) {
            insert.run(kruidenformuleId, obj)
        }
    }

    // Patentformules
    InsertIntoPatentFormules(patentformule) {
        const insert = db.prepare('INSERT INTO PatentFormules (Nederlands, Engels, Pinjin, Werking, Tong, Pols, ContraIndicaties) VALUES (?, ?, ?, ?, ?, ?, ?)');

        const info = insert.run(patentformule.Nederlands, patentformule.Engels, patentformule.Pinjin, patentformule.Werking, patentformule.Tong, patentformule.Pols, patentformule.ContraIndicaties);

        console.log(info);
        return info.lastInsertRowid;
    }

    InsertIntoChineseKruidenEnPatentFormules(patentformuleId, selectedChineseKruiden) {
        const insert = db.prepare('INSERT INTO ChineseKruidenEnPatentFormules (PatentFormuleId, KruidId) VALUES (?, @Id)')

        for (const obj of selectedChineseKruiden) {
            insert.run(patentformuleId, obj)
        }
    }

    InsertIntoPatentFormulesEnSymptomen(patentformuleId, selectedSymptomen) {
        const insert = db.prepare('INSERT INTO PatentFormulesEnSymptomen (PatentformuleId, SymptoomId) VALUES (?, @Id)')

        for (const obj of selectedSymptomen) {
            insert.run(patentformuleId, obj)
        }
    }

    // Chinese Kruiden
    InsertIntoChineseKruiden(chineesKruid) {
        const insert = db.prepare('INSERT INTO ChineseKruiden (Pinjin, Engels, Latijn, ThermischeWerking, Smaak, Meridianen, Werking, ContraIndicaties, Dosering) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const info = insert.run(chineesKruid.Pinjin, chineesKruid.Engels, chineesKruid.Latijn, chineesKruid.ThermischeWerking, chineesKruid.Smaak, chineesKruid.Meridianen, chineesKruid.Werking, chineesKruid.ContraIndicaties, chineesKruid.Dosering);

        return info.lastInsertRowid;
    }

    InsertIntoChineseKruidenEnSymptomen(chineesKruidId, selectedSymptomen) {
        console.log(chineesKruidId);
        const insert = db.prepare('INSERT INTO ChineseKruidenEnSymptomen (ChineesKruidId, SymptoomId) VALUES (?, @Id)')

        for (const obj of selectedSymptomen) {
            insert.run(chineesKruidId, obj)
        }
    }

    // Symptomen
    InsertIntoSymptomen(symptoom) {
        const insert = db.prepare('INSERT INTO Symptomen (Naam) VALUES (?)');
        const info = insert.run(symptoom.Naam);

        console.log(info.lastInsertRowid);
    }
}