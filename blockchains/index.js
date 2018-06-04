/*
Author: Jervyn Suguitan
Date: 5-28


*/

     //use node.js wrapper
     const Poloniex = require('poloniex-api-node');
     let poloniex = new Poloniex();
      
     //recieve updates from WebSocket
     poloniex.subscribe('ticker');
     poloniex.subscribe('BTC_ETC');
           


     //message occurs when an update from a subscribed channel occurs
     poloniex.on('message', (channelName, data, seq) => {
     if (channelName === 'ticker') 
     {
          var outputLast;
          
          //value from poloniex 
          outputLast = data.last;

          //requesting from coinmarketcap
          var request = require('request');
          request('https://api.coinmarketcap.com/v1/ticker/bitcoin/', function (error, response, body) 
          {
               //check if there is no errors and status is normal
               if( !error && response.statusCode == 200 )
               {
                    //console.log(body); // print out body object
                    
                    //parse out body string and input values into the info object                    
                    var info = JSON.parse(body);

                   
                    //equation for the ETH to USD value
                    var finalValue = outputLast * info[0].price_usd;

                    //print out value
                    console.log('ETH to USD - ' + finalValue );

               }

               //price_usd
          });




     }
      



















     if (channelName === 'BTC_ETC') 
     {
          console.log(`order book and trade updates received for currency pair ${channelName}`);
          console.log(`data sequence number is ${seq}`);
     }
     
     });
      
     poloniex.on('open', () => {
          console.log(`Poloniex WebSocket connection open`);
     });
      
     poloniex.on('close', (reason, details) => {
       console.log(`Poloniex WebSocket connection disconnected`);
     });
      
     poloniex.on('error', (error) => {
       console.log(`An error has occured`);
     });
      
     poloniex.openWebSocket({ version: 2 });





