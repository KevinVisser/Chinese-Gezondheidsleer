class KruidenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT Id, Nederlands, Latijns FROM Kruiden");
        console.log("Hello, World");
        return stmt.all();
    }

    GetSpecificKruid(id) {
        console.log(id);
        let stmt = db.prepare("SELECT * FROM Kruiden WHERE Id=?").get(id)
        return stmt;
    }

    SearchKruiden(search) {
        let stmt = db.prepare("SELECT Id, Nederlands, Latijns, ThermischeWaarde FROM Kruiden WHERE Nederlands LIKE ('%' || ? || '%') OR Latijns LIKE ('%' || ? || '%') OR Id LIKE ('%' || ? || '%') OR ThermischeWaarde LIKE ('%' || ? || '%')")
        return stmt.all(search, search, search, search);
    }
}