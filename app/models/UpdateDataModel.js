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

    UpdateChineseKruidenEnSymptomen(chineesKruidId, selectedSymptomen, currentSymptomen) {
        let add = db.prepare("INSERT INTO ChineseKruidenEnSymptomen (ChineesKruidId, SymptoomId) VALUES (?,?)");
        let del = db.prepare("DELETE FROM ChineseKruidenEnSymptomen WHERE ChineesKruidId=? AND SymptoomId=?");

        // let stmt = db.prepare("SELECT * FROM KruidenFormulesEnSymptomen WHERE SymptoomId=? AND chineesKruidId = ?")

        console.log(selectedSymptomen, currentSymptomen);
        let found;

        let toegevoegd = [];
        let verwijderd = [];

        // Zit er iets in selected wat niet in current zit dan is er wat toegevoegd.
        selectedSymptomen.forEach(element => {
            for (let index = 0; index < currentSymptomen.length; index++) {
                if (element.Naam == currentSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                add.run(chineesKruidId, element.Id);
                toegevoegd.push(element);
            }
        });

        currentSymptomen.forEach(element => {
            for (let index = 0; index < selectedSymptomen.length; index++) {
                if (element.Naam == selectedSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                del.run(chineesKruidId, element.Id)
                verwijderd.push(element);
            }
        });
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

    UpdateKruidenFormulesEnSymptomen(kruidenFormuleId, selectedSymptomen, currentSymptomen) {
        let add = db.prepare("INSERT INTO KruidenFormulesEnSymptomen (KruidenFormuleId, SymptoomId) VALUES (?,?)");
        let del = db.prepare("DELETE FROM KruidenFormulesEnSymptomen WHERE KruidenFormuleId=? AND SymptoomId=?");

        // let stmt = db.prepare("SELECT * FROM KruidenFormulesEnSymptomen WHERE SymptoomId=? AND KruidenFormuleId = ?")

        console.log(selectedSymptomen, currentSymptomen);
        let found;

        let toegevoegd = [];
        let verwijderd = [];

        // Zit er iets in selected wat niet in current zit dan is er wat toegevoegd.
        selectedSymptomen.forEach(element => {
            for (let index = 0; index < currentSymptomen.length; index++) {
                if (element.Naam == currentSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                add.run(kruidenFormuleId, element.Id);
                toegevoegd.push(element);
            }
        });

        currentSymptomen.forEach(element => {
            for (let index = 0; index < selectedSymptomen.length; index++) {
                if (element.Naam == selectedSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                del.run(kruidenFormuleId, element.Id)
                verwijderd.push(element);
            }
        });
    }

    UpdateKruidenFormulesEnKruiden(kruidenFormuleId, selectedKruiden, currentKruiden) {
        let add = db.prepare("INSERT INTO KruidenFormulesEnKruiden (KruidenFormuleId, KruidenId, Verhouding) VALUES (?,?,?)");
        let del = db.prepare("DELETE FROM KruidenFormulesEnKruiden WHERE KruidenFormuleId=? AND KruidenId=?");

        // let stmt = db.prepare("SELECT * FROM KruidenFormulesEnSymptomen WHERE SymptoomId=? AND KruidenFormuleId = ?")

        console.log(selectedKruiden, currentKruiden);
        let found;

        let toegevoegd = [];
        let verwijderd = [];

        // Zit er iets in selected wat niet in current zit dan is er wat toegevoegd.
        selectedKruiden.forEach(element => {
            for (let index = 0; index < currentKruiden.length; index++) {
                if (element.Nederlands == currentKruiden[index].Nederlands) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                add.run(kruidenFormuleId, element.Id, element.Verhouding);
                toegevoegd.push(element);
            }
        });

        currentKruiden.forEach(element => {
            for (let index = 0; index < selectedKruiden.length; index++) {
                if (element.Nederlands == selectedKruiden[index].Nederlands) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                console.log(element);
                console.log(kruidenFormuleId, element.Id);
                del.run(kruidenFormuleId, element.Id)
                verwijderd.push(element);
            }
        });
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

    UpdatePatentFormulesEnSymptomen(patentFormuleId, selectedSymptomen, currentSymptomen) {
        let add = db.prepare("INSERT INTO PatentFormulesEnSymptomen (PatentFormuleId, SymptoomId) VALUES (?,?)");
        let del = db.prepare("DELETE FROM PatentFormulesEnSymptomen WHERE PatentFormuleId=? AND SymptoomId=?");

        console.log(selectedSymptomen, currentSymptomen);
        let found;

        let toegevoegd = [];
        let verwijderd = [];

        // Zit er iets in selected wat niet in current zit dan is er wat toegevoegd.
        selectedSymptomen.forEach(element => {
            for (let index = 0; index < currentSymptomen.length; index++) {
                if (element.Naam == currentSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                add.run(patentFormuleId, element.Id);
                toegevoegd.push(element);
            }
        });

        currentSymptomen.forEach(element => {
            for (let index = 0; index < selectedSymptomen.length; index++) {
                if (element.Naam == selectedSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                del.run(patentFormuleId, element.Id)
                verwijderd.push(element);
            }
        });
    }

    UpdateChineseKruidenEnPatentFormules(patentFormuleId, selectedKruiden, currentKruiden) {
        let add = db.prepare("INSERT INTO ChineseKruidenEnPatentFormules (PatentFormuleId, KruidId, Verhouding) VALUES (?,?,?)");
        let del = db.prepare("DELETE FROM ChineseKruidenEnPatentFormules WHERE PatentFormuleId=? AND KruidId=?");

        // let stmt = db.prepare("SELECT * FROM KruidenFormulesEnSymptomen WHERE SymptoomId=? AND KruidenFormuleId = ?")

        console.log(selectedKruiden, currentKruiden);
        let found;

        let toegevoegd = [];
        let verwijderd = [];

        // Zit er iets in selected wat niet in current zit dan is er wat toegevoegd.
        selectedKruiden.forEach(element => {
            for (let index = 0; index < currentKruiden.length; index++) {
                if (element.Nederlands == currentKruiden[index].Nederlands) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                add.run(patentFormuleId, element.Id, element.Verhouding);
                toegevoegd.push(element);
            }
        });

        currentKruiden.forEach(element => {
            for (let index = 0; index < selectedKruiden.length; index++) {
                if (element.Nederlands == selectedKruiden[index].Nederlands) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                del.run(patentFormuleId, element.Id)
                verwijderd.push(element);
            }
        });
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

        console.log(selectedPatentFormules.length, selectedKruidenFormules.length);

        let index = 0;

        // Als er nog wat ingevuld moet worden
        while (selectedPatentFormules.length > index || selectedKruidenFormules.length > index) {
            if (selectedPatentFormules.length == selectedKruidenFormules.length || (selectedPatentFormules.length > index && selectedKruidenFormules.length > index)) {
                console.log("INSERT ------- Het was gelijk");
                insertBoth.run(syndroomId, selectedPatentFormules[index].Id, selectedKruidenFormules[index].Id)
            } else {
                console.log(index, selectedPatentFormules.length, selectedKruidenFormules.length);
                // Als er meer items staan in de kruidenformule array
                if (selectedPatentFormules.length <= index && selectedKruidenFormules.length > index) {
                    console.log("INSERT ------- KruidenFormule is groter");
                    insertKruid.run(syndroomId, selectedKruidenFormules[index].Id)
                }

                // Als er meer items staan in de patentformule array
                if (selectedPatentFormules.length > index && selectedKruidenFormules.length <= index) {
                    console.log("INSERT ------- Patentformule is groter");
                    insertPatent.run(syndroomId, selectedPatentFormules[index].Id)
                }
            }
            index++;
        }
    }

    UpdateSyndromenEnSymptomen(syndroomId, selectedSymptomen, currentSymptomen) {
        let add = db.prepare("INSERT INTO SyndromenEnSymptomen (SyndroomId, SymptoomId) VALUES (?,?)");
        let del = db.prepare("DELETE FROM SyndromenEnSymptomen WHERE SyndroomId=? AND SymptoomId=?");

        console.log(selectedSymptomen, currentSymptomen);
        let found;

        let toegevoegd = [];
        let verwijderd = [];

        // Zit er iets in selected wat niet in current zit dan is er wat toegevoegd.
        selectedSymptomen.forEach(element => {
            for (let index = 0; index < currentSymptomen.length; index++) {
                if (element.Naam == currentSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                add.run(syndroomId, element.Id);
                toegevoegd.push(element);
            }
        });

        currentSymptomen.forEach(element => {
            for (let index = 0; index < selectedSymptomen.length; index++) {
                if (element.Naam == selectedSymptomen[index].Naam) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (!found) {
                del.run(syndroomId, element.Id);
                verwijderd.push(element);
            }
        });
    }
}