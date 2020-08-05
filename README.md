# Shop sample

1. react app - client
2. asp net core 3 - web api
3. postgres db - web api db
4. identiy server - identity server 4

## How to run:

 - git clone https://github.com/JumpAttacker/ShopSample.git
 - cd shopSample
 - docker-compose up --build
 - ctrl+c (postgres is crashing for first run)
 - docker-compose up -d
 - open in browser http://localhost:3000


## Settings:
#### Client: 
 * ShopFront/src/Constants.ts
 
### IdentityServer
 * IdentityServer4/src/IdentityServer4Demo/Config.cs 
 
line 129: interactive.public
 
### Shop API
 * ShopBack/src/apps/Shop/Properties/launchSettings.json