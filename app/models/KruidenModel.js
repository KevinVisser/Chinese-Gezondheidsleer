class KruidenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT Id, Nederlands, Latijns, ThermischeWaarde FROM Kruiden");
        return stmt.all();
    }

    GetSpecificKruid(id) {
        let stmt = db.prepare("SELECT * FROM Kruiden WHERE Id=?").get(id)
        return stmt;
    }
}