# RadiTube Tool Frontend
This repo features the code for the new RadiTube Tool frontend.

[![Netlify Status](https://api.netlify.com/api/v1/badges/3f77774e-0476-4bbb-9fac-b1acc95e8e8c/deploy-status)](https://app.netlify.com/sites/admiring-kirch-37f230/deploys)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
This frontend requires an ```.env``` with reference to the Serverless endpoints and ```auth_config.json``` for Auth0 authentication.

**.env** 
```
VUE_APP_API_DOMAIN=XXXX
```

**auth_config.json**
```
{
  "domain": "xxx",
  "clientId": "xxx",
  "audience": "xxx"
}
```

```
npm run serve
```

### Compiles and minifies for production
Deployment is done through Netlify. Env are stored in the netlify environment settings. In order to not expose ```auth_config.json```, the values for Auth0 are also stored in the Netlify enviroment settings. The ```auth_config.json``` is generated through ```make_auth_config.sh```.

```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).