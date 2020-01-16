class AddDataModel {
    constructor() { }

    // Kruiden
    InsertIntoKruiden(kruid) {
        let stmt = db.prepare('INSERT INTO Kruiden (Nederlands, Latijns, Familie, Inhoudsstoffen, Toepassing, Eigenschappen, Actie, Gebruik, LetOp, Smaak, Dosering, ThermischeWerking, GebruikteDelen, Orgaan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const info = stmt.run(kruid.Nederlands, kruid.Latijns, kruid.Familie, kruid.Inhoudsstoffen, kruid.Toepassing, kruid.Eigenschappen, kruid.Actie, kruid.Gebruik, kruid.LetOp, kruid.Smaak, kruid.Dosering, kruid.ThermischeWerking, kruid.GebruikteDelen, kruid.Orgaan);
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
        const insert = db.prepare('INSERT INTO KruidenFormulesEnKruiden (KruidenFormuleId, KruidenId, Verhouding) VALUES (?, ?, ?)')

        for (const obj of selectedKruiden) {
            insert.run(kruidenformuleId, obj.Id, obj.Verhouding)
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
        const insert = db.prepare('INSERT INTO ChineseKruidenEnPatentFormules (PatentFormuleId, KruidId, Verhouding) VALUES (?, ?, ?)')

        for (const obj of selectedChineseKruiden) {
            insert.run(patentformuleId, obj.Id, obj.Verhouding)
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
            console.log(obj);
            insert.run(chineesKruidId, obj)
        }
    }

    // Symptomen
    InsertIntoSymptomen(symptoom) {
        const insert = db.prepare('INSERT INTO Symptomen (Naam) VALUES (?)');
        const info = insert.run(symptoom.Naam);

        console.log(info.lastInsertRowid);
    }

    // Syndromen
    InsertIntoSyndromen(syndroom) {
        let stmt = db.prepare('INSERT INTO Syndromen (Syndroom, Hoofdsymptoom, Tong, Pols, Actie, Acupunctuurpunten) VALUES (?, ?, ?, ?, ?, ?)');
        const info = stmt.run(syndroom.Naam, syndroom.Hoofdsymptoom, syndroom.Tong, syndroom.Pols, syndroom.Actie, syndroom.Acupunctuurpunten);

        console.log(info);
        return info.lastInsertRowid;
    }

    InsertIntoActieFormules(syndroomId, selectedPatentFormules, selectedKruidenFormules) {
        const both = db.prepare('INSERT INTO ActieFormules (SyndroomId, PatentFormuleId, KruidenFormuleId) VALUES (?, ?, ?)');
        const patent = db.prepare('INSERT INTO ActieFormules (SyndroomId, PatentFormuleId) VALUES (?, ?)');
        const kruiden = db.prepare('INSERT INTO ActieFormules (SyndroomId, KruidenFormuleId) VALUES (?, ?)');
        console.log(selectedPatentFormules.length, selectedKruidenFormules.length);

        let index = 0;
        while (selectedPatentFormules.length > index || selectedKruidenFormules.length > index) {
            console.log(selectedPatentFormules.length > index, selectedKruidenFormules.length > index);
            // Als er evenveel items in de array staan
            if (selectedPatentFormules.length == selectedKruidenFormules.length || (selectedPatentFormules.length > index && selectedKruidenFormules.length > index)) {
                console.log("Het was gelijk");
                both.run(syndroomId, selectedPatentFormules[index].Id, selectedKruidenFormules[index].Id)
            } else {
                console.log(index, selectedPatentFormules.length, selectedKruidenFormules.length);
                // Als er meer items staan in de kruidenformule array
                if (selectedPatentFormules.length <= index && selectedKruidenFormules.length > index) {
                    console.log("KruidenFormule is groter");
                    kruiden.run(syndroomId, selectedKruidenFormules[index].Id)
                }

                // Als er meer items staan in de patentformule array
                if (selectedPatentFormules.length > index && selectedKruidenFormules.length <= index) {
                    console.log("Patentformule is groter");
                    patent.run(syndroomId, selectedPatentFormules[index].Id)
                }
            }
            index++;
        }
    }

    InsertIntoSyndromenEnSymptomen(syndroomId, selectedSymptomen) {
        const insert = db.prepare('INSERT INTO SyndromenEnSymptomen (syndroomId, SymptoomId) VALUES (?, @Id)');

        for (const obj of selectedSymptomen) {
            insert.run(syndroomId, obj)
        }
    }

    GetSymptomen() {
        let stmt = db.prepare("SELECT Id, Naam FROM Symptomen");

        return stmt.all();
    }


    // Delete
    DeleteSymptoom(id) {
        const del = db.prepare("DELETE FROM Symptomen WHERE Id = ?").run(id);
    }

    DeleteChineesKruid(id) {
        const del = db.prepare("DELETE FROM ChineseKruiden WHERE Id = ?").run(id);
    }

}