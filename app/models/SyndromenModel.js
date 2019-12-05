class SyndromenModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Id, Syndroom FROM Syndromen");
        return stmt.all();
    }
}