class ZoekenModel {
    constructor() { }

    GetTongData(tong) {
        let array = [];
        let stmt = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, " +
            "PatentFormules.Tong, PatentFormules.Pols, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
            "FROM PatentFormules " +
            "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
            "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
            "WHERE PatentFormules.Tong LIKE ('%' || ? || '%') " +
            "GROUP BY PatentFormules.Id");

        array = stmt.all(tong);
        return array;
    }

    GetPolsData(pols) {
        let array = [];
        let stmt = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, " +
            "PatentFormules.Tong, PatentFormules.Pols, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
            "FROM PatentFormules " +
            "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
            "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
            "WHERE PatentFormules.Pols LIKE ('%' || ? || '%') " +
            "GROUP BY PatentFormules.Id");

        array = stmt.all(pols);
        return array;
    }

    GetSymptoomData(a) {
        var sym = a.split(',');
        let array = [];
        let stmt;
        switch (sym.length) {
            case 1:
                stmt = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, " +
                    "PatentFormules.Tong, PatentFormules.Pols, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
                    "FROM PatentFormules " +
                    "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
                    "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
                    "WHERE Symptomen.Naam LIKE ('%' || ? || '%') " +
                    "GROUP BY PatentFormules.Id");
                array = stmt.all(sym[0]);
                break;
            case 2:
                stmt = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, " +
                    "PatentFormules.Tong, PatentFormules.Pols, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
                    "FROM PatentFormules " +
                    "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
                    "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
                    "WHERE Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%')" +
                    "GROUP BY PatentFormules.Id");
                array = stmt.all(sym[0], sym[1]);
                break;
            case 3:
                stmt = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, " +
                    "PatentFormules.Tong, PatentFormules.Pols, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
                    "FROM PatentFormules " +
                    "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
                    "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
                    "WHERE Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%')" +
                    "GROUP BY PatentFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2]);
                break;
            case 4:
                stmt = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, " +
                    "PatentFormules.Tong, PatentFormules.Pols, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
                    "FROM PatentFormules " +
                    "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
                    "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
                    "WHERE Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%')" +
                    "GROUP BY PatentFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2], sym[3]);
                break;
            case 5:
                stmt = db.prepare("SELECT PatentFormules.Id, PatentFormules.Nederlands, PatentFormules.Engels, PatentFormules.Pinjin, " +
                    "PatentFormules.Tong, PatentFormules.Pols, group_concat(Symptomen.Naam, ', ') AS Symptomen " +
                    "FROM PatentFormules " +
                    "LEFT JOIN PatentFormulesEnSymptomen ON PatentFormules.Id = PatentFormulesEnSymptomen.PatentFormuleId " +
                    "LEFT JOIN Symptomen ON Symptomen.Id = PatentFormulesEnSymptomen.SymptoomId " +
                    "WHERE Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%') OR Symptomen.Naam LIKE ('%' || ? || '%')" +
                    "GROUP BY PatentFormules.Id");
                array = stmt.all(sym[0], sym[1], sym[2], sym[3], sym[4]);
                break;
            default:
                break;
        }
        return array;
    }
}