class KruidenModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Nederlands, Latijns, Familie FROM Kruiden");
        return stmt.all();
    }

    PatentFormules() {
        let stmt = db.prepare("SELECT Nederlands, Engels, Pinjin FROM PatentFormules");
        return stmt.all();
    }

    KruidenFormules() {
        let stmt = db.prepare("SELECT Naam FROM Symptomen");
        return stmt.all();
    }

    Syndroom() {
        let stmt = db.prepare("SELECT Syndroom FROM Syndromen");
        return stmt.all();
    }
}