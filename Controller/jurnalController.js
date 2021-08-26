'use strict'

const response = require('./res')
const connection = require('../conn')

exports.gets = function(req,res){
    connection.query('SELECT * FROM Jurnal',function(error, rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res)
        }
    })
}

exports.get = function(req,res){
    const id = req.params.id

    connection.query('SELECT * FROM Jurnal where id=?',[id],
    function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res)
        }
    })
}

exports.store = function(req,res){
    const judul = req.body.judul
    const penulis = req.body.penulis
    const tahun_publikasi = req.body.tahun_publikasi
    const total_halaman = req.body.total_halaman
    const file =  judul + penulis + tahun_publikasi + '.' + 'pdf'

    connection.query('INSERT into Jurnal (judul,penulis,tahun_publikasi,total_halaman,file)values(?,?,?,?,?) ',
    [judul,penulis,tahun_publikasi,total_halaman,file],
    function(error,rows,fields){
       if(error){
          console.log(error) 
       }else{
           response.ok("Add Jurnal Sukses",res)
       }
    })
}

exports.update = function(req,res){
    const id = req.params.id
    const judul = req.body.judul
    const penulis = req.body.penulis
    const tahun_publikasi = req.body.tahun_publikasi
    const total_halaman = req.body.total_halaman
    const file =  judul + penulis + tahun_publikasi + '.' + 'pdf'

    connection.query('UPDATE Jurnal SET judul=? , penulis=? , tahun_publikasi=? , total_halaman=? , file=? WHERE id=?',
    [judul,penulis,tahun_publikasi,total_halaman,file,id],
    function (error,rows, fields){
        if(error){
            console.log(error)
        }else{
            response.ok("Update Jurnal Success", res)
        }
    });

}
exports.delete = function(req,res){
    const id = req.params.id

    connection.query('DELETE FROM Jurnal where id=?',[id],
    function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Delete Jurnal Success", res)
        }
    })
}