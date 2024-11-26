const express = require('express');
const cors = require('cors');
const cacheRoutes = require('./routes/cacheRoutes');

const app = express();

const allowedDomains=["http://localhost:3000","http://localhost:3001","http://localhost:3002","http://localhost:3003", "http://localhost:3005","https://test.veots.in/"]
// app.use(cors());
app.use(cors({  
    credentials:true,
    origin:function (origin, callback) {
        // bypass the requests with no origin
        if (!origin) return callback(null, true);
        if (allowedDomains.indexOf(origin) === -1) {
            let msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    exposedHeaders:['Content-Disposition']
}));
app.use(express.json());

// Routes
app.use('/api/cache', cacheRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
