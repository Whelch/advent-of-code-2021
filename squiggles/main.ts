import {RequestOptions} from 'https';
import {IncomingMessage} from 'http';
import {readFileSync} from "fs";
import {chain, random, times} from 'lodash';
import {firstLastDigits} from './email-formulas/first-last-digits';
const https = require('https');

const firstNames = chain(readFileSync('./squiggles/first_names.txt')).split('\n').valueOf();
const lastNames = chain(readFileSync('./squiggles/first_names.txt')).split('\n').valueOf();
const emailDomains = chain(readFileSync('./squiggles/email_domains.txt')).split('\n').valueOf();
const areaCodes = chain(readFileSync('./squiggles/area_codes.txt')).split('\n').valueOf();
const zipCodes = chain(readFileSync('./squiggles/zip_codes.txt')).split('\n').valueOf();


let firstName = firstNames[random(firstNames.length)];
let lastName = lastNames[random(lastNames.length)];
let emailDomain = emailDomains[random(emailDomains.length)];
let areaCode = areaCodes[random(areaCodes.length)];
let zipCode = zipCodes[random(zipCodes.length)];

let phoneNumber = `+1${areaCode}${times(7, () => random(9)).join('')}`;

let emailAddress = firstLastDigits(firstName, lastName, emailDomain);

console.log(phoneNumber, emailAddress);


// const data = JSON.stringify({
//   city: null,
//   country: null,
//   emailAddress: 'tanyatheevil220@gmail.com',
//   firstName: 'Tanya',
//   lastName: 'Yellerman',
//   mobileNumber: '+16512463826',
//   postcode: '55436',
//   registrationType: 'email',
//   state: null,
//   streetAddress: null,
// });
//
// const onError = (error: any) => console.log('ERROR!: ', error);
//
// const options = (length: number, xAuthToken?: string): RequestOptions => {
//   return {
//     method: 'POST',
//     headers: {
//       'Accept': `application/json, text/plain, */*`,
//       'Accept-Encoding': `gzip, deflate, br`,
//       'Accept-Language': `en-US,en;q=0.9`,
//       'Connection': `keep-alive`,
//       'Content-Length': length,
//       'Content-Type': `application/json;charset=UTF-8`,
//       'Cookie': `_fbp=fb.1.1638407053901.1632459687; _ar_fan_auth_token_=${xAuthToken ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyLXJlY29yZC1zdHJpbmciOiJ7OmFjY291bnQtaWQgNDk5ODM5NDgsIDphY2NvdW50LXR5cGUgXCJGQU5cIn0iLCJjbGllbnQtaWRlbnRpdHkiOiJ7XCJhY2NvdW50SWRcIjo0OTk4Mzk0OCxcImFjY291bnRUeXBlXCI6XCJGQU5cIn0iLCJtYXNxdWVyYWRlci1yZWNvcmQtc3RyaW5nIjpudWxsLCJzdWIiOjQ5OTgzOTQ4LCJleHAiOjE2OTM2MTY2NTYsImlhdCI6MTYzODQwNzA1Nn0.AuMoA4Bl_ClcuPH66t3Js1k0MnA5XiHuNMHFdCPHRo0'}`,
//       'Host': `arep.co`,
//       'Origin': `https://arep.co`,
//       'Referer': `https://arep.co/VKmm9/register`,
//       'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"`,
//       'sec-ch-ua-mobile': `?0`,
//       'sec-ch-ua-platform': `"Windows"`,
//       'Sec-Fetch-Dest': `empty`,
//       'Sec-Fetch-Mode': `cors`,
//       'Sec-Fetch-Site': `same-origin`,
//       'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36`,
//     }
//   };
// };
//
// const req = https.request('https://arep.co/api/v1/cn/campaign-account', options(data.length), (res: IncomingMessage) => {
// // const req = https.request('https://httpbin.org/post', options(data.length), (res: IncomingMessage) => {
//   console.log(`STATUSCODE: ${res.statusCode}\n`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}\n`);
//
//   res.on('data', (d: any) => {
//     console.log(`${d}\n`);
//     const xAuthToken = res.headers['x-auth-token'];
//     console.log(`x-auth-token: ${xAuthToken}\n`);
//
//     const dataFan = JSON.stringify({
//       registrationType: 'email',
//       selectedVenue: '',
//       uri: '/VKmm9/register/',
//     });
//
//     const reqFan = https.request('https://arep.co/api/v1/cn/campaign-fan', options(dataFan.length, xAuthToken as string), (res: any) => {
//       console.log(`STATUSCODE: ${res.statusCode}\n`);
//
//       res.on('data', (d: any) => {
//         console.log(`${d}\n`);
//       });
//     });
//
//     reqFan.on('error', onError);
//     reqFan.write(dataFan);
//     reqFan.end();
//   });
// });
//
// req.on('error', onError);
// req.write(data);
// req.end();