'use strict'
const md5 = require('md5')

const response = require('./res')
const connection = require('../conn')


exports.gets = function(req,res){
    connection.query('SELECT * FROM Admin',function(error, rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res)
        }
    })
}

exports.get = function(req,res){
    const id = req.params.id

    connection.query('SELECT * FROM Admin where id=?',[id],
    function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res)
        }
    })
}

exports.store = function(req,res){
    const password = md5(req.body.password)
    const username = req.body.username
    connection.query('INSERT into Admin (password,username)values(?,?) ',
    [password,username],
    function(error,rows,fields){
       if(error){
          console.log(error) 
       }else{
           response.ok("Admin Add Success",res)
       }
    })
}
exports.update = function(req,res){
    const id = req.params.id
    const password = md5(req.body.password)
    const username = req.body.username

    connection.query('UPDATE Admin SET password=? , username=? WHERE id=?',
    [password,username,id],
    function (error,rows, fields){
        if(error){
            console.log(error)
        }else{
            response.ok("Update Success", res)
        }
    });

}
exports.delete = function(req,res){
    const id = req.params.id

    connection.query('DELETE FROM Admin where id=?',[id],
    function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Delete Success", res)
        }
    })
}