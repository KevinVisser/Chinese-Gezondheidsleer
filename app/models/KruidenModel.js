class KruidenModel {
    constructor() { }

    GetAllData() {
        let stmt = db.prepare("SELECT * FROM Kruiden");
        return stmt.all();
    }

    GetSpecificKruid(id) {
        console.log(id);
        let stmt = db.prepare("SELECT * FROM Kruiden WHERE Id=?").get(id)
        return stmt;
    }
}