/*app.get('/comments', (req, res)=> {
    admin.firestore().collection('comments')
    .orderBy('createdAt', 'desc' )
    .get()
    .then(data =>{
        let products =[];
        data.forEach(doc => {
            products.push({
                commentId: doc.id,
                ... doc.data()
            });
        });
        return res.json(products);
    })
    .catch(err => console.error(err));
});*/



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

/*app.post('/product',FBAuth, (req, res) =>{ 
    const newProduct ={
        name: req.body.name,
        tagLine: req.body.tagLine,
        userHandle: req.user.handle,
        createAt: new Date().toISOString()
    };

    admin.firestore.collection('products')
    .add(newProduct)
    .then(doc =>{
        res.json({message:  `document ${doc.id} created successfully `});    
    })
    .catch(err => {
        res.status(500).json({error: 'something went wrong'});
        console.error(err);
    })

});*/

/*app.get('/googleLogin', (req, res) => {
    const base_provider= firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider)
    .then((result)=>{
        console.log(result); 
        console.log("succes google authentication");
    }).catch( err=> {
        console.log(err);
        console.log("failed google authentication");
    } )

});*/

//upvote product
app.get('/products/:productId/upvote', (req, res)=> {
    const voteDocument = admin.firestore().collection('votes')
    //.where('userHandle', '==', req.user.handle)
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
                    userHandle: "user"
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