module.exports = {
    adicionarAutor: (req, res) => {
        message = '';
        var nome = req.body.nome;
        var idade = req.body.idade;
        var habilidade = req.body.habilidade;

        var sql = "INSERT INTO Autor(name_,age,hability) VALUES ('" + nome + "','" + idade + "','" + habilidade + "')";

        var query = db.query(sql, function (err, result) {

            message = "Succesfully! Your account has been created.";
            res.render('cadastroAutor.ejs', { message: message });
        });
    },

    buscarAutor: (req, res) => {
        var nome = req.body.searchAuthor;
        var resultados = [];

        var select_cliente = "SELECT * FROM Autor";
        db.query(select_cliente, function(err, result) {
            resultados = result;
        });
        return res.status(200).send(resultados);
    }
}