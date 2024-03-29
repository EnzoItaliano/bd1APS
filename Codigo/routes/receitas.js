const resultados = {
    receitas: [],
    receita: null,
    autores: [],
}

var idReceita = '';

module.exports = {
    adicionarReceita: (req, res) => {
        message = '';
        var titulo = req.body.titulo;
        var autor = req.body.autor;
        var ingredientes = req.body.ingredientes;
        var modPrep = req.body.modPrep;

        var sql = "INSERT INTO Receita(title,ingredients,prepMode,author) VALUES ('" + titulo + "','" + ingredientes + "','" + modPrep + "','" + autor + "')";

        var query = db.query(sql, function (err, result) {

            message = "Succesfully! Recipe added.";
            res.render('cadastroReceita.ejs', resultados);
        });
    },

    detalharAutores: (req, res) => {

        query = "SELECT * FROM Autor";
        db.query(query, function (erro, result) {
            resultados.autores = result;
            res.render('cadastroReceita.ejs', resultados);
        });
    },

    buscarReceita: (req, res) => {

        var sql= `SELECT * FROM Receita`;
        db.query(sql, function(err, result) {
            resultados.receitas = result;
            resultados.receita = null;
            console.log(result);
            res.render('receitas', resultados);
        });
    },


    lerReceita: (req, res) => {
        
        idReceita = req.params.id;
        let id = req.params.id;

        id = idReceita.replace(':', '');

        query = "SELECT * FROM Receita WHERE idRecipe='" + id + "'";
        db.query(query, function (erro, result) {
            resultados.receita = result[0];
            console.log(resultados.receita);
            res.render('lerReceita.ejs', resultados);
        });
    },

    detalharReceita: (req, res) => {
        idReceita = req.params.id;
        console.log("Executar açao de editar receita idRecipe=", req.params.id);
        let id = req.params.id;

        query = "SELECT * FROM Receita WHERE idRecipe='" + id + "'";
        db.query(query, function (erro, result) {
            resultados.receita = result[0];
            res.render('editReceita.ejs', resultados);
        });
    },

    editReceita: (req, res) => {
        var titulo = req.body.titulo;
        var ingredientes = req.body.ingredientes;
        var modPrep = req.body.modPrep;
        idReceita = idReceita.replace(':', '');


        var insert = "UPDATE Receita set title='" + titulo + "', ingredients='" + ingredientes + "', prepMode='" + modPrep + "' WHERE idRecipe= ?";
        
        db.query(insert, [idReceita], function (erro, result) {

        	if (erro) {
                console.log("Não foi possivel atualizar a Receita.Erro:" + erro);
                res.render('receitas.ejs', resultados);
            }

            res.redirect('/receitas/');
            console.log(result);
        });

        
    },

    removerReceita: (req, res) => {
        var id = req.params.id;
        var sql = "DELETE FROM Receita  WHERE idRecipe = ?";
        db.query(sql, [id], function (erro, resultado) {
            if (erro) {
                
            }
            console.log("Apagando Recipe");
        });


        var sql = "SELECT * FROM Receita";
        db.query(sql, function (err, result) {
            resultados.receitas = result;
            console.log(result);
            res.redirect('/receitas');
        });
    }
}