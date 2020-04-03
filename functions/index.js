const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jazz-app-3ea68.firebaseio.com"
});


exports.createDummyDataShops = functions.https.onRequest((request, response) => {

    let dbb = admin.firestore();
    let counter = request.query.counter || 10;

    const promises = []

    for (let i = 0; i < counter; i++) {
        promises.push(
            dbb.collection('shops').add({
                city: {
                    id: "",
                    name: "Taubaté",                    
                    geo: {
                        lat: 10,
                        lng: 10
                    } 
                },
                createdAt: '2020-01-01',
                createdBy: ' STR4dYJpqpehPfYQldqHHmeBvYf1',
                description: "Sonia Frango",
                rating: 5,
                isNew: true,
                likes: 0,
                dislikes: 0,
                timeToDelivery: "40-50 min" ,
                rateToDelivery: 8.5,
                segment: {
                    id: "",
                    name: "Hortifruti"
                },
                contacts: [
                    {
                        type: "WhatsApp",
                        content: "+55 (12) 99122-9818"
                    },
                    {
                        type: "Telefone",
                        content: "+55 (12) 3424-3089"
                    },
                    {
                        type: "iFood",
                        content: "https://www.ifood.com.br/delivery/taubate-sp/leao-casa-de-carnes-esplanada-santa-terezinha/26fa76d2-def3-4dc4-bd38-31f19b1ab033"
                    }
                ],
                name: "Sonia Frango"
            })
        )
    }

    return Promise.all(promises)
        .then(resultsArray => {
            response.send(counter + ' Dummy Values Created!');
            return response;
        })
        .catch(error => {
           console.log(error)
           response.status(500).send(error)
        });

});


exports.deleteDummyDataShops = functions.https.onRequest((request, response) => {

    let dbb = admin.firestore();

    // Get a new write batch
    var batch = dbb.batch()

    dbb.collection('shops').listDocuments()
    .then(val => {
        val.map((val) => {
            return batch.delete(val)
        })

        batch.commit()
        .then((result) =>{
            return response;
        })
        .catch((err) =>{
            console.log(err)
            response.status(500).send(err);
        })

        response.send('Dummy Data Deleted!');
        return response;

    }).catch(err =>{
        console.log(err)
        response.status(500).send(err)
    })

    

});

