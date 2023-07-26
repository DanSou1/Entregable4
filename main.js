const fs = require('fs').promises;
const express = require('express');
const { error } = require('console');
const { parse } = require('path');
const app= express();
const PORT = 8080;

class ProductManager{
    constructor(){
    }
    async getProducts()
    {
        app.use(express.urlencoded({extended:true}))
        app.get('/productos',async (req,res)=>
        {
            try {
                const productos = await fs.readFile('./Productos/productos.json', 'utf-8');
                let parseado =  JSON.parse(productos);
                res.send(parseado);
            } catch (error) {
                console.log('Hubo un error: ' + error);
            }
        }
        )
    }
    async getProduct(){
        app.get('/productos/:consulta', async (req, res)=>{
            let consulta = parseInt(req.params.consulta);
            const productos = await fs.readFile('./Productos/productos.json', 'utf-8');
            let parseado =  JSON.parse(productos);
            let producto = parseado.find(item =>item.id === consulta);
            if (!producto) {
                return res.send({error: "Producto no encontrado."})
            }
            else{
                res.send({producto})
            }
        })
    }
}
app.listen(PORT, ()=>{console.log('Servidor conectado al puerto: ' + PORT)});
const producto1 = new ProductManager();
/* producto1.getProducts(); */
producto1.getProduct();
