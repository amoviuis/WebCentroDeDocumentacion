
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));



const uri = "mongodb+srv://irvin:1234@clusteramovi.etgkuek.mongodb.net/Inventario_CentroDe_Documentacion?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.render('index.ejs', {root: path.join(__dirname, 'public')});
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;

  client.connect(err => {
    if (err) throw err;
    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");
    function diacriticSensitiveRegex(string = '') {
      return string
          .replace(/a/g, '[a,á,à,ä,â]')
          .replace(/A/g, '[A,a,á,à,ä,â]')
          .replace(/e/g, '[e,é,ë,è]')
          .replace(/E/g, '[E,e,é,ë,è]')
          .replace(/i/g, '[i,í,ï,ì]')
          .replace(/I/g, '[I,i,í,ï,ì]')
          .replace(/o/g, '[o,ó,ö,ò]')
          .replace(/O/g, '[O,o,ó,ö,ò]')
          .replace(/u/g, '[u,ü,ú,ù]')
          .replace(/U/g, '[U,u,ü,ú,ù]');
    }

    collection.find({
      $or: [
        { "No_Inventario": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "Título": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "Autor(es)": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "Subtítulo": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "Año": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "Linea temática": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "Tipo de material": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "Ubicación Geografica": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "PC2: Territorio": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },
        { "PC4: Secundaria": {$regex: diacriticSensitiveRegex(keyword), $options: 'i' } },

      ]
    }).toArray((err, result) => {
      if (err) throw err;
      res.render('search', { results: result });
    });
  });
});

app.get('/details/:id', (req, res) => {
  const itemId = req.params.id;

  client.connect(err => {
    if (err) throw err;
    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");
    collection.findOne({ "_id": ObjectId(itemId) }, (err, result) => {
      if (err) throw err;
      res.render('details', { item: result });
    });
  });
});


app.get('/advanced-search', (req, res) => {
  const field = req.query.field;
  const value = req.query.value;

  console.log("Field:", field);
  console.log("Value:", value);

  client.connect(err => {
    if (err) throw err;
    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");

    const query = {};

    if (field === "author") {
      query["Autor(es)"] = { $regex: value, $options: 'i' };
    } else if (field === "year") {
      query["Año"] = { $regex: value, $options: 'i' };
    } else if (field === "inventory") {
      query["No_Inventario"] = { $regex: value, $options: 'i' };
    }

    console.log("Query:", query);

    collection.find(query).toArray((err, result) => {
      if (err) throw err;
      res.render('search', { results: result });
    });
  });
});

app.get('/products_amovi', (req, res) => {
  client.connect(err => {
    if (err) throw err;
    const collection = client.db("Inventario_CentroDe_Documentacion").collection("ProductosAMOVI");
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      res.render('products', { results: result });
    });
  });
});

app.get('/historia', (req, res) => {
  client.connect(err => {
    if (err) throw err;

    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");


    const query = { "No_Inventario": { $regex: /^H/i } };


    collection.countDocuments(query, (err, count) => {
      if (err) throw err;


      console.log(`Cantidad de documentos en la línea de Historia: ${count}`);

      collection.find(query).toArray((err, result) => {
        if (err) throw err;

        console.log("Documentos recuperados:", result);

        res.render('historia', { results: result, count: count });
      });
    });
  });
});

app.get('/funprocep', (req, res) => {
  client.connect(err => {
    if (err) throw err;

    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");


    const query = { "No_Inventario": { $regex: /^F/i } };


    collection.countDocuments(query, (err, count) => {
      if (err) throw err;


      console.log(`Cantidad de documentos en la línea de Funprocep: ${count}`);

      collection.find(query).toArray((err, result) => {
        if (err) throw err;

        console.log("Documentos recuperados:", result);

        res.render('funprocep', { results: result, count: count });
      });
    });
  });
});


app.get('/ruta_pacifica', (req, res) => {
  client.connect(err => {
    if (err) throw err;

    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");


    const query = { "No_Inventario": { $regex: /^R/i } };


    collection.countDocuments(query, (err, count) => {
      if (err) throw err;


      console.log(`Cantidad de documentos en la línea de Ruta Pacífica: ${count}`);

      collection.find(query).toArray((err, result) => {
        if (err) throw err;

        console.log("Documentos recuperados:", result);

        res.render('ruta_pacifica', { results: result, count: count });
      });
    });
  });
});



app.get('/dpi', (req, res) => {
  client.connect(err => {
    if (err) throw err;

    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");


    const query = { "No_Inventario": { $regex: /^D/i } };


    collection.countDocuments(query, (err, count) => {
      if (err) throw err;


      console.log(`Cantidad de documentos en la línea DPI: ${count}`);

      collection.find(query).toArray((err, result) => {
        if (err) throw err;

        console.log("Documentos recuperados:", result);

        res.render('dpi', { results: result, count: count });
      });
    });
  });
});


app.get('/ddhhmc', (req, res) => {
  client.connect(err => {
    if (err) throw err;

    const collection = client.db("Inventario_CentroDe_Documentacion").collection("Centro_de_documentacion");


    const query = { "No_Inventario": { $regex: /^DH/i } };


    collection.countDocuments(query, (err, count) => {
      if (err) throw err;


      console.log(`Cantidad de documentos en la línea DDHHMC: ${count}`);

      collection.find(query).toArray((err, result) => {
        if (err) throw err;

        console.log("Documentos recuperados:", result);

        res.render('ddhhmc', { results: result, count: count });
      });
    });
  });
});





app.get('/details_products/:id', (req, res) => {
  const itemId = req.params.id;

  client.connect(err => {
    if (err) throw err;
    const collection = client.db("Inventario_CentroDe_Documentacion").collection("ProductosAMOVI");
    collection.findOne({ "_id": ObjectId(itemId) }, (err, result) => {
      if (err) throw err;
      res.render('detailsProductsAMOVI', { item: result });
    });
  });
});



app.get('/information_amovi', (req, res) => {
  res.render('information.ejs', {root: path.join(__dirname, 'public')});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

