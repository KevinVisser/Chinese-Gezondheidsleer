class KruidenFormulesModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Id, Naam FROM KruidenFormules");
        return stmt.all();
    }
}