class ZoekenKFModel {
    constructor() { }

    GetWerkingData(a) {
        var sym = a.split(',');
        let array = [];
        let stmt;

        console.log(sym);

        switch (sym.length) {
            case 1:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking" +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0]);                
                break;
            case 2:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1]);
                break;
            case 3:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2]);
                break;
            case 4:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2], sym[3]);
                break;
            case 5:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "OR KruidenFormules.Werking LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2], sym[3], sym[4]);
                break;
            default:
                break;
            }            
        return array;
    }

    GetIngredientenData(a) {
        var sym = a.split(',');
        let array = [];
        let stmt;

        console.log(sym);

        switch (sym.length) {
            case 1:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[0]);                
                break;
            case 2:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[0], sym[1], sym[1]);
                break;
            case 3:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[0], sym[1], sym[1], sym[2], sym[2]);
                break;
            case 4:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[0], sym[1], sym[1], sym[2], sym[2], sym[3], sym[3]);
                break;
            case 5:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "OR Kruiden.Nederlands LIKE ('%' || ? || '%') OR Kruiden.Latijns LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[0], sym[1], sym[1], sym[2], sym[2], sym[3], sym[3], sym[4], sym[4]);
                break;
            default:
                break;
            }            
        return array;
    }

    GetSymptoomData(a) {
        var sym = a.split(',');
        let array = [];
        let stmt;

        console.log(sym);

        switch (sym.length) {
            case 1:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking" +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Symptomen.Naam LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0]);                
                break;
            case 2:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1]);
                break;
            case 3:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Symptomen.Naam ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2]);
                break;
            case 4:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2], sym[3]);
                break;
            case 5:
                stmt = db.prepare("SELECT KruidenFormules.Naam, KruidenFormules.Id, group_concat(DISTINCT ' ' || Kruiden.Nederlands) AS Nederlands, " +
                "group_concat(DISTINCT ' ' ||Kruiden.Latijns) AS Latijns, group_concat(DISTINCT ' ' ||Symptomen.Naam) AS Symptomen, KruidenFormules.Werking " +
                "FROM KruidenFormules " +
                "LEFT JOIN KruidenFormulesEnKruiden ON KruidenFormules.Id = KruidenFormulesEnKruiden.KruidenFormuleId " +
                "LEFT JOIN KruidenFormulesEnSymptomen ON KruidenFormules.Id = KruidenFormulesEnSymptomen.KruidenFormuleId " +
                "LEFT JOIN Symptomen ON Symptomen.Id = KruidenFormulesEnSymptomen.SymptoomId " +
                "LEFT JOIN Kruiden ON KruidenFormulesEnKruiden.KruidenId = Kruiden.Id " +
                "WHERE Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "OR Symptomen.Naam LIKE ('%' || ? || '%') "+
                "GROUP BY KruidenFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2], sym[3], sym[4]);
                break;
            default:
                break;
            }            
        return array;
    }
}