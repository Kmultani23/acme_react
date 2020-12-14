const express = require('express');
const { static } = express;
const path = require('path');

const app = express();

app.use('/dist', static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '.', '/public')))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/team', async(req, res, next)=> {
    try {
        res.send(await Team.findAll());
    }
    catch (ex){
        next(ex);
    }
})

app.get('/api/player', async(req, res, next)=> {
    try {
        res.send(await Player.findAll());
    }
    catch (ex){
        next(ex);
    }
})


app.get('/api/player/:id', async(req, res, next)=> {
    try {
        res.send(await Player.findByPk(req.params.id, {include: [Team]}));
    }
    catch (ex){
        next(ex);
    }
})

const init = async()=> {
    try {
        await syncAndSeed();
        const port  = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));

    }
    catch(ex){
        console.log(ex);
    }
}

const Sequelize = require('sequelize');
const client = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/favplayer');
const { STRING, INTEGER } = client.Sequelize;

const Team = client.define('team', {
    team: STRING,
    location: STRING,
    imgURL: STRING,
    

});

const Player = client.define('player', {
    name: STRING,
    age: INTEGER,
    bio: STRING,
});




Team.hasMany(Player);
Player.belongsTo(Team);

const syncAndSeed = async()=> {
    await client.sync({ force:true });
    await Promise.all([
        Team.create({ team: 'Lakers', location: 'LA',  imgURL: 'lakersLogo.png'}),
        Team.create({ team: 'Nets', location: "BK",  imgURL: 'netsLogo.png' }),
        Team.create({ team: 'Golden State', location: 'BAY',  imgURL:'goldeState.png'})
    ]);
    await Promise.all([
        Player.create({ name: 'Lebron', age: '36', bio: 'Best Player on this team', teamId: 1 }),
        Player.create({ name: 'Kyrie', age: '27', bio: 'Best Player on this team', teamId: 2 }),
        Player.create({ name: 'Steph',  age: '30', bio: 'Best Player on this team', teamId: 3 }),
          ]);


};




init();
