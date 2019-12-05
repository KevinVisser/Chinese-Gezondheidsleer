class PatentFormulesModel {
    constructor() { }

    GetRelevantData() {
        let stmt = db.prepare("SELECT Id, Nederlands, Engels, Pinjin FROM PatentFormules");
        return stmt.all();
    }
}