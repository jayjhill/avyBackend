'use strict'
const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

const Xvfb = require('xvfb');
let xvfb = new Xvfb();

try {
  xvfb.startSync();
}
catch (e) {
  console.log(e);
}

const nightmare = Nightmare({ show: false })
const url = 'https://utahavalanchecenter.org/forecast/salt-lake';

nightmare
    .goto(url)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(respons => {
        console.log(getData(respons));
        async function downloadImage () {  
          const url = getData(respons);
          const path = Path.resolve(__dirname, 'images', 'avy' + yyyymmdd() + '.png')
          console.log(__dirname);
          const writer = Fs.createWriteStream(path)
        
          const response = await Axios({
            url,
            method: 'GET',
            responseType: 'stream'
          })
        
          response.data.pipe(writer)
        
          return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
          })
        }
        
        downloadImage() 
        


    }).catch(err=> {
        console.log(err);
    });


    let getData = html => {
        const $ = cheerio.load(html);
        var title = $('.full-width.compass-width.sm-pb3')
        let baseUrl = "https://utahavalanchecenter.org"
        let report = baseUrl + title.attr('src');
    return report;
    }


function yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return '' + y + mm + dd;
}



 






