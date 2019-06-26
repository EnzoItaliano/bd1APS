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
        var resultado = null;


        var sql= "SELECT * FROM Autor";
        db.query(sql, function(err, result) {
            resultados = result;
            console.log(result);
            res.render('autores', {resultados: resultados});
        });
    },

    deletarAutor: (req, res) => {
        
    }
}