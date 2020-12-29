const functions = require('firebase-functions');

const admin=require('firebase-admin');
admin.initializeApp();

const express=require("express");
const app=express();

const config={
    apiKey: "AIzaSyCLbfgrTiEL4BAce3LMUHtPRwE9aY7BP1I",
    authDomain: "core-falcon-267013.firebaseapp.com",
    databaseURL: "https://core-falcon-267013.firebaseio.com",
    projectId: "core-falcon-267013",
    storageBucket: "core-falcon-267013.appspot.com",
    messagingSenderId: "648579736082",
    appId: "1:648579736082:web:6e1f49386c383c0dee6ecb",
    measurementId: "G-VRYV5203RV"
}

const firebase=require("firebase");
firebase.initializeApp(config);
app.get('/screams',(request,response)=>{
    admin.firestore().collection('screams').orderBy('createdAt','desc').get().then((data)=>{
        let screams=[];
        data.forEach((doc)=>{
            screams.push({
                screamId:doc.id,
                body:doc.data().body,
                userHandle:doc.data().userHandle,
                createdAt:doc.data().createdAt,
            });
        });
        return response.json(screams);
    }).catch((err)=>console.error(err));

})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.post()
app.post('/screams',(request,response)=>{
    
    const newScream={
        body:request.body.body,
        userHandle:request.body.userHandle,
        createdAt:new Date().toISOString()//admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore().collection('screams').add(newScream).then((doc)=>{
        response.json({
            message:`document ${doc.id} created Successfully`
        });
    }).catch((err)=>{
        response.status(500).json({
            error:"Something went wrong: "+err
        });
    });

});

exports.api=functions.region('asia-east2').https.onRequest(app);