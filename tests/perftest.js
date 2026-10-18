import http from 'k6/http';
import { check, sleep } from 'k6';

const strBaseUrl = 'https://api.maazsidd.ca';   // or http://192.168.2.218 for the internal test

export const options = {
    stages: [
        { duration: '1m', target: 20 },    // ramp up to 20 virtual users
        { duration: '2m', target: 20 },    // hold
        { duration: '1m', target: 100 },   // ramp up to 100
        { duration: '2m', target: 100 },   // hold
        { duration: '1m', target: 0 },     // ramp down
    ],
    thresholds: {
        http_req_failed:   ['rate<0.01'],   // under 1% of requests may fail
        http_req_duration: ['p(95)<500'],   // 95% of requests under 500 ms
    },
};

export default function () {
    const objRes = http.get(`${strBaseUrl}/api/portfolio/get-portfolio-data`);

    check(objRes, {
        'status is 200': (objR) => objR.status === 200,
    });

    sleep(1 + Math.random() * 2);   // "think time": 1–3 s between requests
}