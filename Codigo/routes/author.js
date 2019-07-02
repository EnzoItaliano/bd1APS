const resultados = {
    autores: [],
    autor: null,
}

var idAuthor = '';

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

        var sql= "SELECT * FROM Autor";
        db.query(sql, function(err, result) {
            resultados.autores = result;
            resultados.autor = null;
            console.log(result);
            res.render('autores', resultados);
        });
    },



    detalharAutor: (req, res) => {
        /*
            Para editar as informaçoes do Autor
            é necessario buscar primeiro as informaçoes no banco
            e depois retornar para a pagina
        */
        idAuthor = req.params.id;
        console.log("Executar açao de editar cliente idAuthor=", req.params.id);
        let id = req.params.id;

        query = "SELECT * FROM Autor WHERE idAuthor='" + id + "'";
        db.query(query, function (erro, result) {
            resultados.autor = result[0];
            res.render('editAutor.ejs', resultados);
        });
    },

    editAutor: (req, res) => {
        var nome = req.body.nome;
        var idade = req.body.idade;
        var habilidade = req.body.habilidade;
        idAuthor = idAuthor.replace(':', '');


        var insert = "UPDATE Autor set name_='" + nome + "', age='" + idade + "', hability='" + habilidade + "' WHERE idAuthor= ?";
        console.log(insert);
        db.query(insert, [idAuthor], function (erro, result) {

        	if (erro) {
                console.log("Não foi possivel atualizar o cliente.Erro:" + erro);
                res.render('autores.ejs', resultados);
            }

            res.redirect('/author/');
            console.log(result);
        });

        
    },

    removerAutor: (req, res) => {
        var id = req.params.id;
        var sql = "DELETE FROM Autor  WHERE idAuthor = ?";
        db.query(sql, [id], function (erro, resultado) {
            if (erro) {
                // dadosParaPagina.message_erro = "Não foi possivel remover o cliente.Erro:" + erro;
            }
            console.log("Apagando Cliente");
        });


        var sql = "SELECT * FROM Autor";
        db.query(sql, function (err, result) {
            resultados.autores = result;
            console.log(result);
            res.render('autores', resultados);
        });
    }
}