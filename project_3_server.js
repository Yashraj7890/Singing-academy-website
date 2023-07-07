const exp = require("express");
require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Yash:"+process.env.MONGOPASSWORD+"@cluster0.djeqndd.mongodb.net/customersDB?retryWrites=true&w=majority", { useNewUrlParser: true,useunifiedTopology:true });
const customerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    country: String,
    email: String,
    course: String
});
const Customer = mongoose.model("Customer", customerSchema);

const customer = new Customer({
    first_name: "john",
    last_name: "doer",
    country: "USA",
    email: "123@gmail.com",
    course: "western"
});


const bodyParser = require("body-parser")
const app = exp();
app.use(exp.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/enrolled", function (req, res) {

        res.sendFile(__dirname + "/enrolled.html");
    

});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get("/enroll", function (req, res) {
    res.sendFile(__dirname + "/enroll.html");
});
app.get("/error", function (req, res) {
    res.sendFile(__dirname + "/error.html");
});



app.post("/enroll", function (req, res) {

    const fn = req.body.first_name.trim();
    const ln = req.body.last_name.trim();
    const location = req.body.country.trim();
    const email_address = req.body.email.trim();
    var course_chosen = req.body.course;
    if (course_chosen == 1) {
        course_chosen = "instrumental";
    }
    else if (course_chosen == 2) {
        course_chosen = "western";
    }
    else if (course_chosen == 3) {
        course_chosen = "classical";
    }

    Customer.findOne({ email: email_address })
        .then((result) => {
            if (result == null) {
                const member = new Customer({
                    first_name: fn,
                    last_name: ln,
                    country: location,
                    email: email_address,
                    course: course_chosen
                });
                member.save().then(function () {
                    res.redirect("/enrolled");
                })
            }
            else {
                res.redirect("/error")
            }
        });
});

app.listen(8000, function () {
    console.log("live at port 8000");
});