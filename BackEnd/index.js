const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./model/User');
const Post = require('./model/Post')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


require("dotenv").config();
const PORT = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static( __dirname + '/uploads'))

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

app.post('/signup', async (req, res) => {
    try {
        let { firstName, lastName, email, password, confirmPassword } = req.body;

        if (password === confirmPassword) {
            password = await bcrypt.hash(password, 10);
            let data = await User.create({ firstName, lastName, email, password: password });

            const payload = {
                email: data.email,
                password: data.password
            };
    
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
    
            data = data.toObject();
            data.token = token;
            data.password = undefined;
    
            // Cookie creation
            const options = {
                expires: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000))
            };
    
            res.cookie("miteshCookie", token, options);


            res.status(200).json({
                success: true,
                data: data,
                message: "Data successfully fetched"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Enter a valid password"
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        const payload = {
            email: user.email,
            password: user.password
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        user = user.toObject();
        user.token = token;
        user.password = undefined;

        // Cookie creation
        const options = {
            expires: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000))
        };

        res.cookie("miteshCookie", token, options);
        res.status(200).json({
            success: true,
            user,
            message: "User logged in successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.get('/profile', async (req, res) => {
    try {
        const { miteshCookie } = req.cookies;
        if (!miteshCookie) {
            return res.status(401).json({
                success: false,
                message: 'JWT token is missing'
            });
        }

        const { email } = await jwt.verify(miteshCookie, process.env.JWT_SECRET);

        res.json({ email });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {

    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title : title,
            summary : summary,
            content : content,
            cover: newPath,
        });


        res.json(postDoc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/post' ,async(req,res)=>{
    const posts = await Post.find().sort({createdAt:-1}).limit(20);
    res.json(posts)
})

app.get('/post/:id' , async(req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id);
        
        
       const { miteshCookie } = req.cookies;
       
        const info =  jwt.verify(miteshCookie , process.env.JWT_SECRET )
         res.json({info,post})
      
    }
  catch(err){
    console.log(err);  
    res.json(
        err
    )
  }

})


app.put('/post' ,uploadMiddleware.single('file') , async(req,res) =>{ 
   
    let {title,summary,id,content} = req.body;
    console.log("object " ,content)
    let newPath = '';
    if(req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
         newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { miteshCookie } = req.cookies;
    jwt.verify(miteshCookie , process.env.JWT_SECRET , async(err,info) =>{
     
     console.log("info",info)


        const postDoc = await Post.findById(id);
        // console.log("postDoc",postDoc)
        const isAuthor = JSON.stringify(postDoc._id) === JSON.stringify(id)
        console.log("Author -> ", isAuthor)
         if(!isAuthor){
        return res.status(400).json(
            'you are not the Author'
        )  
      }

       await postDoc.updateOne({
        title,
        summary,
        content ,
        cover:newPath ? newPath :postDoc.cover
    })
    res.json(postDoc)
    })

})

app.delete('/delete/:id' , async(req,res) =>{

    try{
     const {id} = req.params;
     const post = await Post.findByIdAndDelete(id);

     res.json({
        post
     })
    }
    catch(err){
        res.json({
            err
        })
    }
    
    
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const Connect = require('./config/database');
Connect();





