var express     =require('F:/node/NPMfiles/node_modules/express'),
methodOverride  =require('F:/node/NPMfiles/node_modules/method-override'),
    app         =express(),
    mongoose    =require('F:/node/NPMfiles/node_modules/mongoose');


app.set("view engine","ejs");

app.use('/static', express.static('public'));
var BodyParser=require('F:/node/NPMfiles/node_modules/body-parser');

app.use(BodyParser.urlencoded( { extended:true },{useNewUrlParser: true, useUnifiedTopology: true} ,));
mongoose.connect("mongodb://localhost/tinio", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(methodOverride("_method"));

// mongoose.connect("");

var statSchema =new mongoose.Schema({
    roll            :Number,
     account_id     :String,
     daten          :String,
     hour           :Number,
     success_count  :Number, 
     failed_count   :Number,
     timeout_count  :Number,
     call_count     :Number,
     sms_count      :Number,
     amount_paid    :Number,

});

var stat= mongoose.model("stat",statSchema);


// this will manually insert records in database.....
// var myobj =new stat(
//{ roll:1,account_id:"suren",daten:25-06-2020,hour:23,success_count:12,failed_count:10,timeout_count:11,call_count:20,sms_count:13,amount_paid:50.50}
// { roll:2,account_id:"shailesh",daten:25-06-2020,hour:23,success_count:12,failed_count:10,timeout_count:11,call_count:20,sms_count:13,amount_paid:50.60}
//{ roll:3,account_id:"shailesh",daten:24-06-2020,hour:23,success_count:12,failed_count:10,timeout_count:11,call_count:20,sms_count:13,amount_paid:50.50}
// { roll:4,account_id:"suren",daten:24-06-2020,hour:23,success_count:12,failed_count:10,timeout_count:11,call_count:20,sms_count:13,amount_paid:50.50} 
// );


// and this will niw add to Database!!!!
// myobj.save(function(err,stats)
// {
//     if(err)
//         console.log(err);
//     else
//         console.log("done!!");
// });




app.get("/",function(req,res){
    res.redirect("/assignment");
});

//1. INDEX ROUTE - LIST ALL ROUTE

app.get("/assignment",function(req,res){
    stat.find({},function(err,table)
    {
        if(err)
            console.log(err);
        else
        res.render("index",{table:table});
    });
});

// 3. CREATE A NEW ROUTE AND THEN REDIRECT SOMEWHERE-

app.post("/assignment",function(req,res){
    var rollr=req.body.roll,
     accountr=req.body.account_id,
     daters=req.body.daten;
    //  console.log(req.body.daten);
     hourr=req.body.hour,
     successr=req.body.success_count,
     failedr=req.body.failed_count,
     timeoutr=req.body.timeout_count,
     callr=req.body.call_count,
     smsr=req.body.sms_count,
     amountr=req.body.amount_paid,
     object_c={roll:rollr,account_id:accountr,daten:daters,hour:hourr,success_count:successr,failed_count:failedr,call_count:callr,timeout_count:timeoutr,sms_count:smsr,amount_paid:amountr};

        stat.create(object_c, function(err,newrec){
        if(err)
            console.log(err)
        else
        {
            // console.log(req.body.daten);
            res.redirect("/assignment");
        }
            
    });
   
});

//2. NEW ROUTE- SHOW A NEW ROUTE FORM
app.get("/assignment/new",function(req,res){
    res.render("new");
});


// 4.SHOW ROUTE - SHOW SPECIFIC ROUTE BRIEFLY!
app.get("/assignment/:id",function(req,res){
   
    //  return foundtable;
    stat.findById(req.params.id,function(err,foundtable){
        if(err)
            console.log(err);
        else
        {
            res.render("show",{table: foundtable});
            // console.log(foundtable);
        }
    });
});

// // 5. EDIT ROUTE- EDIT ANY OF THE PREVIOUS ROUTE..
app.get("/assignment/:id/inter/edit",function(req,res)
{
    stat.findById(req.params.id,function(err,foundtable){
        if(err)
            console.log("ewrrrrr");
        else
        {
             res.render("edit",{table: foundtable});
            // console.log(foundtable);
        }
        
    });
});

// // 6. PUT ROUTE- UPDATE THE ROUTE AND REDIRECT SOMEWHERE..

app.put("/assignment/:id/inter",function(req,res){
    stat.findByIdAndUpdate(req.params.id,req.body.table,function(err,found)
    {
            if(err)
                console.log(err.message);
            else{
                found.save();
                 //console.log(found);
               // console.log(req.body);
                res.redirect("/assignment");
            }

    });
});

//7. DESTROY - DELETE A PARTICULAR ROUTE AND THEN REDIRECT SOMEWHERE....
app.delete("/assignment/:id/inter",function(req,res){
    stat.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
            console.log(err);
        else
            res.redirect("/assignment");
    });
});



app.listen(3000,function(){
    console.log("waheguru");
});