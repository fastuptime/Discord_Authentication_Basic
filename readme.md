# Discord Authentication Basic

A simple Node.js application for Discord authentication. This project allows users to log in using their Discord credentials and access information about their servers and connections.

## Features
- 🌐 Basic Discord OAuth2 authentication
- ⚡ Easy integration with existing projects
- 🏗️ Lightweight and fast
- 🎨 User-friendly interface using Bulma CSS

## Requirements
- 📦 Node.js
- 🔑 Discord Developer Application

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fastuptime/Discord_Authentication_Basic.git
   cd Discord_Authentication_Basic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `config.js` file with your Discord credentials:
   ```
   db: your_atlas_url
   clientID: your_client_id
   clientSecret: your_client_secret
   callbackURL: your_redirect_uri
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Screenshots

![image](https://github.com/fastuptime/Discord_Authentication_Basic/assets/63351166/3d361649-6ee2-4323-bf50-06aefb16617e)
![image](https://github.com/fastuptime/Discord_Authentication_Basic/assets/63351166/6ff7cc60-3277-4511-8cbf-b16ebaa81d49)
![image](https://github.com/fastuptime/Discord_Authentication_Basic/assets/63351166/1ae69d73-2d5b-4dd3-a3d4-eb6b1e2472dc)
![image](https://github.com/fastuptime/Discord_Authentication_Basic/assets/63351166/fa111c1a-ea38-4c86-8cc1-3452b1a73f6b)


## Usage
1. Navigate to `http://localhost:8000` in your browser.
2. Click the "Login with Discord" button to authenticate.

## Routes

- `/auth/login` - Redirects to Discord for authentication.
- `/auth/logout` - Logs out the user.
- `/servers` - Displays the user's Discord servers.
- `/connections` - Displays the user's Discord connections.

## Code Structure

### HTML Templates

- **Home Page (`index.ejs`)**
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Discord Auth</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
  </head>
  <body>
      <section class="section">
          <div class="container">
              <div class="columns is-centered">
                  <div class="column is-half">
                      <% if(user) { %> 
                          <div class="box">
                              <h1 class="title">Welcome, <%= user.username %></h1>
                              <p class="subtitle">You are logged in with Discord</p>
                              <a href="/servers" class="button is-primary">Servers</a>
                              <a href="/connections" class="button is-dark">Connections</a>
                              <a href="/auth/logout" class="button is-danger">Logout</a>
                          </div>
                      <% } else { %>
                          <div class="box">
                              <h1 class="title">Discord Auth</h1>
                              <p class="subtitle">Login with Discord</p>
                              <a href="/auth/login" class="button is-primary">Login</a>
                          </div>
                      <% } %>
                  </div>
              </div>
          </div>
      </section>
  </body>
  </html>
  ```

- **Servers Page (`servers.ejs`)**
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Discord Servers</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
  </head>
  <body>
      <section class="section">
          <div class="container">
              <div class="columns is-centered">
                  <div class="column is-half">
                      <% if(servers) { %>
                          <div class="box">
                              <h1 class="title">Sunucular</h1>
                              <p class="subtitle">
                                  Katıldığınız sunucular
                              </p>
                              <% servers.forEach(server => { %>
                                  <div class="box">
                                      <article class="media">
                                          <div class="media-left is-hidden-mobile">
                                              <figure class="image is-64x64">
                                                  <img src="https://cdn.discordapp.com/icons/<%= server.id %>/<%= server.icon %>.png" style="border-radius: 50%;">
                                              </figure>
                                          </div>
                                          <div class="media-content">
                                              <div class="content">
                                                  <p>
                                                      <strong><%= server.name %></strong>
                                                      <br>
                                                      <small><%= server.id %></small>
                                                      <br>
                                                      <small>Statü: <%= server.owner ? 'Sahip' : 'Üye' %></small>
                                                  </p>
                                              </div>
                                          </div>
                                      </article>
                                  </div>
                              <% }) %>
                          </div>
                      <% } else { %>
                          <div class="box">
                              <h1 class="title">Hata</h1>
                              <p class="subtitle">
                                  Sunuculara erişim izniniz yok
                              </p>
                          </div>
                      <% } %>
                      <a href="/" class="button is-primary">Anasayfa</a>
                  </div>
              </div>
          </div>
      </section>
  </body>
  </html>
  ```

- **Connections Page (`connections.ejs`)**
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Discord Connections</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
  </head>
  <body>
      <section class="section">
          <div class="container">
              <div class="columns is-centered">
                  <div class="column is-half">
                      <% if(connections) { %>
                          <div class="box">
                              <h1 class="title">Bağlantılar</h1>
                              <p class="subtitle">
                                  Bağlantılarınız
                              </p>
                              <% connections.forEach(x => { %>
                                  <div class="box">
                                      <article class="media">
                                          <div class="media-content">
                                              <div class="content">
                                                  <p>
                                                      <strong><%= x.name %></strong>
                                                      <br>
                                                      <small><%= x.id %></small>
                                                      <br>
                                                      <small>Platform: <%= x.type %></small>
                                                      <br>
                                                      <small>Doğrulandı: <%= x.verified ? 'Evet' : 'Hayır' %></small>
                                                      <br>
                                                      <small>Görünürlük: <%= x.visibility ? 'Görünür' : 'Gizli' %></small>
                                                      <br>
                                                      <small>Arkadaş Senkronizasyonu: <%= x.friend_sync ? 'Açık' : 'Kapalı' %></small>
                                                      <br>
                                                      <small>Metadata Görünürlüğü: <%= x.metadata_visibility ? 'Açık' : 'Kapalı' %></small>
                                                      <br>
                                                      <small>Aktivite Göster: <%= x.show_activity ? 'Açık' : 'Kapalı' %></small>
                                                      <br>
                                                      <small>İki Yönlü Bağlantı: <%= x.two_way_link ? 'Açık' : 'Kapalı' %></small>
                                                  </p>
                                              </div>
                                          </div>
                                      </article>
                                  </div>
                              <% }) %>
                          </div>
                      <% } else { %>
                          <div class="box">
                              <h1 class="title">Hata</h1>
                              <p class="subtitle">
                                  Erişim izniniz yok
                              </p>
                          </div>
                      <% } %>
                      <a href="/" class="button is-primary">Anasayfa</a>
                  </div>
              </div>
          </div>
      </section>
  </body>
  </html>
  ```

### Authentication Logic

- **Router Configuration (`auth.js`)**

```javascript
const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
var DiscordStrategy = require('passport-discord').Strategy;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
    }
}));

passport.use(new DiscordStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    scope: ['identify', 'guilds', 'email', 'connections']
}, async function(accessToken, refreshToken, profile, done) {
    let user = await userModel.findOne({ userID: profile.id });
    if (!user) {
        var newUser = new userModel({
            userID: profile.id,
            guilds: profile.guilds,
            email: profile.email,
            connections: profile.connections,
        });
        newUser.save();
        return done(null, newUser);
    } else {
        user.guilds = profile.guilds;
        user.email = profile.email;
        user.connections = profile.connections;
        user.save();
        return done(null, user);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

router.get('/login', passport.authenticate('discord', { scope: ['identify', 'guilds', 'email', 'connections'] }), function(req, res) {});

router.get('/callback', function(req, res, next) {
passport.authenticate('discord', {
    successRedirect: '/',
    failureRedirect: '/'
})(req, res, w => {
    console.log(w);
    if(w) return res.send(`<center><h1>Something went wrong. Please try again later.</h1></center>`);
})});

app.use(passport.initialize());
app.use(passport.session());

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
```

## 📞 Support

- [GitHub Issues](https://github.com/fastuptime/Discord_Authentication_Basic/issues)
- [E-mail](mailto:fastuptime@gmail.com)
