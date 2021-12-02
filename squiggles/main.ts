import {RequestOptions} from 'https';
import {IncomingMessage} from 'http';
import {readFileSync} from "fs";
import {chain, random, times} from 'lodash';
import {emailGenerator} from './utils/email-generator';

const https = require('https');

const firstNames = chain(readFileSync('./squiggles/first_names.txt')).split('\n').valueOf();
const lastNames = chain(readFileSync('./squiggles/first_names.txt')).split('\n').valueOf();
const emailDomains = chain(readFileSync('./squiggles/email_domains.txt')).split('\n').valueOf();
const areaCodes = chain(readFileSync('./squiggles/area_codes.txt')).split('\n').valueOf();
const zipCodes = chain(readFileSync('./squiggles/zip_codes.txt')).split('\n').valueOf();


function onError(error: any) {
  console.log('ERROR!: ', error);
}

console.log('-----===== STARTING =====-----')

function options(length: number, xAuthToken?: string): RequestOptions {
  return {
    method: 'POST',
    headers: {
      'Accept': `application/json, text/plain, */*`,
      'Accept-Encoding': `gzip, deflate, br`,
      'Accept-Language': `en-US,en;q=0.9`,
      'Connection': `keep-alive`,
      'Content-Length': length,
      'Content-Type': `application/json;charset=UTF-8`,
      'Cookie': `_fbp=fb.1.1638423941607.1978415783; _ar_fan_auth_token_=${xAuthToken ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyLXJlY29yZC1zdHJpbmciOiJ7OmFjY291bnQtaWQgNTAwMDYyMDYsIDphY2NvdW50LXR5cGUgXCJGQU5cIn0iLCJjbGllbnQtaWRlbnRpdHkiOiJ7XCJhY2NvdW50SWRcIjo1MDAwNjIwNixcImFjY291bnRUeXBlXCI6XCJGQU5cIn0iLCJtYXNxdWVyYWRlci1yZWNvcmQtc3RyaW5nIjpudWxsLCJzdWIiOjUwMDA2MjA2LCJleHAiOjE2OTM2MzM1NDQsImlhdCI6MTYzODQyMzk0NH0.zouoRECZ-kH8ZI-ynybwmOQHwGbZHhbXl60qOT3_HCQ'}`,
      'Host': `arep.co`,
      'Origin': `https://arep.co`,
      'Referer': `https://arep.co/VKmm9/register`,
      'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"`,
      'sec-ch-ua-mobile': `?0`,
      'sec-ch-ua-platform': `"Windows"`,
      'Sec-Fetch-Dest': `empty`,
      'Sec-Fetch-Mode': `cors`,
      'Sec-Fetch-Site': `same-origin`,
      'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36`,
    }
  };
}

let numSent = 0;
let numFailed = 0;

function sendRequest(iteration: number) {
  let firstName = firstNames[random(firstNames.length-1)];
  let lastName = lastNames[random(lastNames.length-1)];
  let emailDomain = emailDomains[random(emailDomains.length-1)];
  let areaCode = areaCodes[random(areaCodes.length-1)];
  let zipCode = zipCodes[random(zipCodes.length-1)];

  let phoneNumber = `+1${areaCode}${times(7, () => random(9)).join('')}`;
  let emailAddress = emailGenerator(firstName, lastName, emailDomain);

  const data = JSON.stringify({
    city: null,
    country: null,
    emailAddress: emailAddress,
    firstName: firstName,
    lastName: lastName,
    mobileNumber: phoneNumber,
    postcode: zipCode,
    registrationType: 'email',
    state: null,
    streetAddress: null,
  });

  const req = https.request('https://arep.co/api/v1/cn/campaign-account', options(data.length), (accountRes: IncomingMessage) => {
  // const req = https.request('https://httpbin.org/post', options(data.length), (accountRes: IncomingMessage) => {
    console.log(`\naccount-STATUSCODE ${iteration}: ${accountRes.statusCode}`);

    const xAuthToken = accountRes.headers['x-auth-token'];

    accountRes.on('data', (d) => {
      if(accountRes.statusCode > 201 || !xAuthToken) {
        console.log(`data: ${data}`);
        console.log(`response: ${d}`);
        console.log(`x-auth-token: ${xAuthToken}`);
        console.log(`\nHEADERS: ${JSON.stringify(accountRes)}\n`);
        numFailed++;
      }

      const dataFan = JSON.stringify({
        registrationType: 'email',
        selectedVenue: '',
        uri: '/VKmm9/register/',
      });

      const reqFan = https.request('https://arep.co/api/v1/cn/campaign-fan', options(dataFan.length, xAuthToken as string), (fanRes: IncomingMessage) => {
        console.log(`fan-STATUSCODE ${iteration}: ${fanRes.statusCode}`);
        fanRes.on('data', (d) => {
          if(fanRes.statusCode > 201) {
            console.log(`response: ${d}`);
            numFailed++;
          }
        });
      });
      reqFan.on('error', onError);
      reqFan.write(dataFan);
      reqFan.end();
    });
  });

  req.on('error', onError);
  req.write(data);
  req.end();
}

function loop() {
  if (numSent < 1) {
    setTimeout(() => {
      sendRequest(numSent++);
      loop();
    }, 2000);
  } else {
    console.log('\n-----=====DONE=====-----');
    console.log(`Num Failed: ${numFailed}`);
  }
}

// loop();


let firstName = firstNames[random(firstNames.length-1)];
let lastName = lastNames[random(lastNames.length-1)];
let emailDomain = emailDomains[random(emailDomains.length-1)];
let areaCode = areaCodes[random(areaCodes.length-1)];
let zipCode = zipCodes[random(zipCodes.length-1)];

let phoneNumber = `+1${areaCode}${times(7, () => random(9)).join('')}`;
let emailAddress = emailGenerator(firstName, lastName, emailDomain);

console.log(`First Name: ${firstName}`);
console.log(`Last Name: ${lastName}`);
console.log(`Email Address: ${emailAddress}`);
console.log(`Phone Number: ${phoneNumber}`);
console.log(`Zip Code: ${zipCode}`);