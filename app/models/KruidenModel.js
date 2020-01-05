class KruidenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT Id, Nederlands, Latijns, ThermischeWerking FROM Kruiden");
        return stmt.all();
    }

    GetSpecificKruid(id) {
        let stmt = db.prepare("SELECT * FROM Kruiden WHERE Id=?").get(id)
        return stmt;
    }

    SearchKruiden(search) {
        let stmt = db.prepare("SELECT Id, Nederlands, Latijns, ThermischeWerking FROM Kruiden WHERE Nederlands LIKE ('%' || ? || '%') OR Latijns LIKE ('%' || ? || '%') OR Id LIKE ('%' || ? || '%') OR ThermischeWerking LIKE ('%' || ? || '%')")
        return stmt.all(search, search, search, search);
    }

    GetKruidByNederlands(name) {
        let stmt = db.prepare("SELECT * FROM Kruiden WHERE Nederlands = ?")

        let status = stmt.get(name);
        if (status === undefined) {
            return false;
        } else {
            return true;
        }
    }

    GetKruidByLatijns(name) {
        let stmt = db.prepare("SELECT * FROM Kruiden WHERE Latijns = ?")

        let status = stmt.get(name);
        if (status === undefined) {
            return false;
        } else {
            return true;
        }
    }
}