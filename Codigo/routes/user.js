const messages = {
   message_erro: '',
   message_sucesso: ''
}

//signup
exports.signup = function (req, res) {
   messages.message_erro = '';
   messages.message_sucesso = '';

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

//login
exports.login = function(req, res){
   messages.message_erro = '';
   messages.message_sucesso = '';

   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var e_mail= post.email;
      var pass= post.senha;
     
      var sql="SELECT idUser, nome FROM Usuario WHERE email ='"+e_mail+"' and senha = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(!err){
            if(results.length){
               req.session.userId = results[0].id;
               req.session.user = results[0];
               console.log(results[0].id);
               res.redirect('/home/dashboard');
            }
            else{
               message = 'Wrong Credentials.';
               res.render('login.ejs',{message: messages});
            }
         }
      });
   } else {
      res.render('login.ejs',{message: messages});
   }
           
};

//dashboard
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};