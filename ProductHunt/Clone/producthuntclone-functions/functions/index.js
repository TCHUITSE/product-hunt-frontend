const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require ('express')();

const cors = require('cors');
app.use(cors());
//var serviceAccount = require('../key/key.json');
admin.initializeApp();
//admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount),
//});

const config ={
    apiKey: "AIzaSyC2DJbqAGmbqLEYykOa64xOASXrgFo1bNg",
    authDomain: "product-hunt-clone-e7b44.firebaseapp.com",
    databaseURL: "https://product-hunt-clone-e7b44.firebaseio.com",
    projectId: "product-hunt-clone-e7b44",
    storageBucket: "product-hunt-clone-e7b44.appspot.com",
    messagingSenderId: "599474014173",
    appId: "1:599474014173:web:5ef004a15df280aa73d834",
    measurementId: "G-F8S2B7CHCG"
  };

const firebase= require ('firebase');
firebase.initializeApp(config)

app.get('/products', (req, res)=> {
    admin.firestore().collection('products')
    .orderBy('createdAt', 'desc' )
    .get()
    .then(data =>{
        let products =[];
        data.forEach(doc => {
            products.push({
                productId: doc.id,
                ... doc.data()
            });
        });
        return res.json(products);
    })
    .catch(err => console.error(err));
});


app.get('/products/:productId', (req, res)=>{
   let productData ={};
    admin.firestore().doc(`/products/${req.params.productId}`).get()
    .then(doc =>{
        if(!doc.exists){
            return res.status(404).json({error: 'Product not found'})
        }
        productData= doc.data();
        productData.productId=doc.id;
        return admin.firestore().collection('comments')
        .orderBy('createdAt', 'desc')
        .where('productId', '==', req.params.productId).get();

    })
    .then(data =>{
        productData.comments=[];
        data.forEach(doc =>{
            productData.comments.push(doc.data())
        });
        return res.json(productData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })

});

const FBAuth = (req, res, next) => {
    let idToken;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      idToken = req.headers.authorization.split('Bearer ')[1];  
   } 
   else{
       console.error('No token found');
       return res.status(403).json({error: 'Unauthorized'});
   }
   admin.auth().verifyIdToken(idToken)
   .then(decodedToken => {
       req.user =decodedToken;
       return admin.firestore().collection('users')
       .where('userId', '==', req.user.uid)
       .limit(1)
       .get();
   })
   .then(data => {
       req.user.handle= data.docs[0].data().handle;
       return next();
   })
   .catch(err =>{
       console.error('error while verifying token ' , err );
        return res.status(403).json(err);
   })
}

//upvote product
app.post('/products/:productId/upvote', (req, res)=> {
    const voteDocument = admin.firestore().collection('votes')
    .where('userId', '==', req.body.userId)
    .where('productId', '==', req.params.productId).limit(1);

    const productDocument = admin.firestore().doc(`/products/${req.params.productId}`);

    let productData;
    productDocument.get()
        .then(doc => {
            if(doc.exists){
                productData = doc.data();
                productData.productId = doc.id;
                return voteDocument.get();
            }
            else{
                return res.status(404).json({error: "product not found"});
            }
        })
        .then(data =>{
            if(data.empty){
                return admin.firestore().collection('votes').add({
                    productId: req.params.productId,
                    userId: req.body.userId,
                    userHandle: req.body.userHandle
                    //userHandle: req.user.handle
                })
                .then( () =>{
                    productData.vote++
                    return productDocument.update({vote: productData.vote});
                })
                .then(()=> {
                    return res.json(productData);
                })
            }
            else{
                return res.status(400).json({error: 'product already upvote'});
            }
        })
        .catch(err =>{
            console.error(err);
            res.status(500).json({error: err.code});
        });


});
//comment product
app.post('/products/:productId/comment', (req, res)=>{
    if(req.body.body.trim() === '') return res.status(400).json({error:"Must not be empty"});

    const newComment = {
        body:req.body.body,
        createdAt: new Date().toISOString(),
        productId: req.params.productId,
        userHandle: req.body.userHandle,
        userImage:req.body.photoURL,
        userId: req.body.userId,
         
    };
    admin.firestore().doc(`/products/${req.params.productId}`).get()
    .then(doc =>{
        if(!doc.exists){
            return res.status(404).json({error: "product not found"});
        }
        //return admin.firestore().collection('comments').add(newComment);
        return doc.ref.update({ comment : doc.data().comment+1});
    })
    .then(() =>{
        return admin.firestore().collection('comments').add(newComment);
    })
    .then(() =>{
        res.json(newComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Something went wrong'});
    })
});

//downvote product
app.post('/products/:productId/downvote',(req, res) => {
    const voteDocument = admin.firestore()
      .collection('votes')
      .where('userId', '==', req.body.userId)
      .where('productId', '==', req.params.productId)
      .limit(1);
  
    const productDocument = admin.firestore().doc(`/products/${req.params.productId}`);
  
    let productData;
  
    productDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          productData = doc.data();
          productData.productId = doc.id;
          return voteDocument.get();
        } else {
          return res.status(404).json({ error: 'Product not found' });
        }
      })
      .then((data) => {
        if (data.empty) {
          return res.status(400).json({ error: 'Product not voted' });
        } else {
          return admin.firestore()
            .doc(`/votes/${data.docs[0].id}`)
            .delete()
            .then(() => {
              productData.vote--;
              return productDocument.update({ vote: productData.vote });
            })
            .then(() => {
              res.json(productData);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
});


exports .api = functions.https.onRequest(app);
//exports .api = functions.region('europe-west1').https.onRequest(app);
