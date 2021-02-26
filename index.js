const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const Xvfb = require('xvfb');
let xvfb = new Xvfb();

try {
  xvfb.startSync();
}
catch (e) {
  console.log(e);
}

const nightmare = Nightmare({ show: true })
const url = 'https://utahavalanchecenter.org/forecast/salt-lake';

nightmare
    .goto(url)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        console.log("poop1");
        console.log(getData("response" + response));

    }).catch(err=> {
        console.log(err);
    });


    let getData = html => {
        console.log("poop");
        data = [];
        const $ = cheerio.load(html);
        //var title = $('.text_03.pt2');
        var title = $('.full-width compass-width sm-pb3')
        console.log(title.text());
        report = title.text();

        let url = report.match(/ (?:^|\W*)(low)(?:$|\W*)/gi);



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

function yyyymm() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var mm = m < 10 ? '0' + m : m;
    return '' + y + mm;
}

const urlImg = "https://utahavalanchecenter.org/sites/default/files/forecast/" + yyyymm() + "/" + yyyymmdd() + "-071704-6.png";
console.log(urlImg);


'use strict'

const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function downloadImage () {  
  const url = urlImg
  const path = Path.resolve(__dirname, 'images', 'avy' + yyyymmdd() + '.png')
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
