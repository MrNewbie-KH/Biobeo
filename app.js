require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {protect} = require("./authMiddleware")
const {promisify}=require("util")
// Rotaların import edilmesi
const routeRoutes = require('./Routes/routeRoutes');
const poiRoutes = require('./Routes/poiRoutes'); // POI için oluşturduğunuz rota
const quizRoutes = require('./Routes/quizRoutes'); // Quiz için oluşturduğunuz rota
const answerRoutes = require('./Routes/answerRoutes'); // Cevaplar için oluşturduğunuz rota
const userRoutes = require('./Routes/userRoutes'); // Kullanıcı rotaları
const statisticsRoutes = require('./Routes/statisticsRoutes'); // İstatistikler için rota


const app = express();

// CORS middleware'ini kullanarak tüm originlerden gelen isteklere izin ver
app.use(cors());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT middleware

// app.use(async (req, res, next) => {
//     const protectedRoutes = [
//         '/api/routes',
//         '/api/pois',
//         '/api/quizzes',
//         '/api/answers',
//         '/api/statistics/totalVisitedPOIs'
//     ];

//     // Sadece belirli rotalarda token kontrolü yap
//     if (protectedRoutes.includes(req.path)) {
//         const token = req.headers.authorization?.split(" ")[1];

//         // Token yoksa hata dön
//         if (!token) {
//             return res.status(403).json({ auth: false, message: 'No token provided.' });
//         }

//         // Token doğrula
//         const verifyAsync = promisify(jwt.verify);
//         try {
//             const decoded = await verifyAsync(token, process.env.JWT_SECRET);
//             // İstekin kullanıcı kimliğini kaydet
//             console.log(decoded);
//             req.userId = decoded.id;
//             next();
//         } catch (err) {
//             return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
//         }
//     } else {
//         // Diğer rotalarda token kontrolü yapma, bir sonraki middleware'e geç
//         next();
//     }
// });


app.use(async (req, res, next) => {
    let token;  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.userId=decoded.id;
    } 
    //2)verification token
    next();
})

// Kullanıcı rotalarının uygulamaya eklenmesi
app.use('/api/users', userRoutes);

// Diğer rotaların uygulamaya eklenmesi
app.use('/api/routes', routeRoutes);
app.use('/api/pois', poiRoutes); // POI için oluşturduğunuz rota
app.use('/api/quizzes', quizRoutes); // Quiz için oluşturduğunuz rota
app.use('/api/answers', answerRoutes); // Cevaplar için oluşturduğunuz rota
app.use('/api/statistics', statisticsRoutes); // İstatistikler için rota

// Server'ın başlatılması
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
