const messages = {
   message_erro: '',
   message_sucesso: ''
}

exports.signup = function (req, res) {
   messages.message_erro = '';
   messages.message_erro = '';

   if (req.method == "POST") {
      var post = req.body;
      var name = post.nome;
      var pass = post.senha;
      var e_mail = post.email;

      var sql = "INSERT INTO Usuario(senha, nome,email) VALUES ('" + pass + "','" + name + "','" + e_mail + "')";

      var query = db.query(sql, function (erro, result) {
         if (erro) {
            messages.message_erro = "Não foi possivel adicionar o cliente.Erro:" + erro;
            res.render('signup.ejs', messages);
         }
      });

   } else {
      res.render('signup');
   }
};