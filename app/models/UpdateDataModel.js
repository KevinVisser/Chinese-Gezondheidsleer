class UpdataDataModel {
    constructor() { }

    // Kruiden
    UpdateKruid(id, updatedData) {
        let stmt = db.prepare("UPDATE Kruiden SET Familie=?,Inhoudsstoffen=?,Toepassing=?,Eigenschappen=?,Actie=?,Gebruik=?,LetOp=?,Smaak=?,Dosering=?,ThermischeWerking=?,GebruikteDelen=?,Orgaan=? WHERE Id = ?")
        stmt.run(
            updatedData.Familie,
            updatedData.Inhoudsstoffen,
            updatedData.Toepassing,
            updatedData.Eigenschappen,
            updatedData.Actie,
            updatedData.Gebruik,
            updatedData.LetOp,
            updatedData.Smaak,
            updatedData.Dosering,
            updatedData.ThermischeWerking,
            updatedData.GebruikteDelen,
            updatedData.Orgaan,
            id
        );
    }

    // Chinese Kruiden
    UpdateChineseKruiden(id, updatedData) {
        let stmt = db.prepare("UPDATE ChineseKruiden SET ThermischeWerking=?,Smaak=?,Meridianen=?,Werking=?,ContraIndicaties=?,Dosering=? WHERE Id=?")

        stmt.run(
            updatedData.ThermischeWerking,
            updatedData.Smaak,
            updatedData.Meridianen,
            updatedData.Werking,
            updatedData.ContraIndicaties,
            updatedData.Dosering,
            id
        )
    }

    UpdateChineseKruidenEnSymptomen(chineesKruidId, selectedSymptomen) {
        let add = db.prepare("INSERT INTO ChineseKruidenEnSymptomen (ChineesKruidId, SymptoomId) VALUES (?,?)");
        let del = db.prepare("DELETE FROM ChineseKruidenEnSymptomen WHERE ChineesKruidId=?").run(chineesKruidId);

        for (const obj of selectedSymptomen) {
            add.run(chineesKruidId, obj.Id)
        }
    }



    // Kruidenformules
    UpdateKruidenFormule(id, updatedData) {
        let stmt = db.prepare("UPDATE KruidenFormules SET Werking=?,ContraIndicatie=? WHERE Id=?")

        stmt.run(
            updatedData.Werking,
            updatedData.ContraIndicatie,
            id
        )
    }

    UpdateKruidenFormulesEnSymptomen(kruidenFormuleId, selectedSymptomen) {
        let add = db.prepare("INSERT INTO KruidenFormulesEnSymptomen (KruidenFormuleId, SymptoomId) VALUES (?,?)");
        db.prepare("DELETE FROM KruidenFormulesEnSymptomen WHERE KruidenFormuleId=?").run(kruidenFormuleId);

        for (const obj of selectedSymptomen) {
            add.run(kruidenFormuleId, obj.Id)
        }
    }

    UpdateKruidenFormulesEnKruiden(kruidenFormuleId, selectedKruiden) {
        let add = db.prepare("INSERT INTO KruidenFormulesEnKruiden (KruidenFormuleId, KruidenId, Verhouding) VALUES (?,?,?)");
        db.prepare("DELETE FROM KruidenFormulesEnKruiden WHERE KruidenFormuleId=?").run(kruidenFormuleId);

        for (const obj of selectedKruiden) {
            add.run(kruidenFormuleId, obj.Id, obj.Verhouding)
        }
    }

    // Patentformules
    UpdatePatentFormule(id, updatedData) {
        let stmt = db.prepare("UPDATE PatentFormules SET Werking=?,Tong=?,Pols=?,ContraIndicaties=? WHERE Id=?")

        stmt.run(
            updatedData.Werking,
            updatedData.Tong,
            updatedData.Pols,
            updatedData.ContraIndicaties,
            id
        )
    }

    UpdatePatentFormulesEnSymptomen(patentFormuleId, selectedSymptomen) {
        let add = db.prepare("INSERT INTO PatentFormulesEnSymptomen (PatentFormuleId, SymptoomId) VALUES (?,?)");
        db.prepare("DELETE FROM PatentFormulesEnSymptomen WHERE PatentFormuleId=?").run(patentFormuleId);

        for (const obj of selectedSymptomen) {
            add.run(patentFormuleId, obj.Id)
        }
    }

    UpdateChineseKruidenEnPatentFormules(patentFormuleId, selectedKruiden) {
        let add = db.prepare("INSERT INTO ChineseKruidenEnPatentFormules (KruidId, PatentFormuleId, Verhouding) VALUES (?,?,?)");
        db.prepare("DELETE FROM ChineseKruidenEnPatentFormules WHERE PatentFormuleId=?").run(patentFormuleId);

        for (const obj of selectedKruiden) {
            add.run(obj.Id, patentFormuleId, obj.Verhouding)
        }
    }

    // Syndromen
    UpdateSyndroom(id, updatedData) {
        let stmt = db.prepare("UPDATE Syndromen SET Syndroom=?,Hoofdsymptoom=?,Tong=?,Pols=?,Actie=?,Acupunctuurpunten=? WHERE Id=?")

        stmt.run(
            updatedData.Naam,
            updatedData.Hoofdsymptoom,
            updatedData.Tong,
            updatedData.Pols,
            updatedData.Actie,
            updatedData.Acupunctuurpunten,
            id
        )
    }

    UpdateActieFormules(syndroomId, selectedPatentFormules, selectedKruidenFormules) {
        // Eerst kijken welke kruidenformules(Nederlands) en patentformules(pinjin) allemaal verwijderd/toegevoegd zijn.

        let deleteAll = db.prepare("DELETE FROM ActieFormules WHERE SyndroomId = ?");

        let insertBoth = db.prepare("INSERT INTO ActieFormules (SyndroomId, PatentFormuleId, KruidenFormuleId) VALUES (?,?,?)")
        let insertKruid = db.prepare("INSERT INTO ActieFormules (SyndroomId, KruidenFormuleId) VALUES (?,?)")
        let insertPatent = db.prepare("INSERT INTO ActieFormules (SyndroomId, PatentFormuleId) VALUES (?,?)")

        // Delete references
        deleteAll.run(syndroomId);


        let index = 0;

        // Als er nog wat ingevuld moet worden
        while (selectedPatentFormules.length > index || selectedKruidenFormules.length > index) {
            if (selectedPatentFormules.length == selectedKruidenFormules.length || (selectedPatentFormules.length > index && selectedKruidenFormules.length > index)) {
                insertBoth.run(syndroomId, selectedPatentFormules[index].Id, selectedKruidenFormules[index].Id)
            } else {
                // Als er meer items staan in de kruidenformule array
                if (selectedPatentFormules.length <= index && selectedKruidenFormules.length > index) {
                    insertKruid.run(syndroomId, selectedKruidenFormules[index].Id)
                }

                // Als er meer items staan in de patentformule array
                if (selectedPatentFormules.length > index && selectedKruidenFormules.length <= index) {
                    insertPatent.run(syndroomId, selectedPatentFormules[index].Id)
                }
            }
            index++;
        }
    }

    UpdateSyndromenEnSymptomen(syndroomId, selectedSymptomen) {
        let add = db.prepare("INSERT INTO SyndromenEnSymptomen (SyndroomId, SymptoomId) VALUES (?,?)");
        let del = db.prepare("DELETE FROM SyndromenEnSymptomen WHERE SyndroomId=?").run(syndroomId);

        for (const obj of selectedSymptomen) {
            add.run(syndroomId, obj.Id)
        }
    }
}