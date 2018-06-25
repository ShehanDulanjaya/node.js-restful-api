
process.env.JWT_KEY = "secrete";
const assert = require('chai').assert;

const userController = require('../api/controllers/user');
const memberController = require('../api/controllers/projectmembers');
const projectController = require('../api/controllers/projects');

let mongoose = require("mongoose");

let Member = require('../api/models/projectmembers');
let Project = require('../api/models/projects');
let User = require('../api/models/user');

const tok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoZWhhMUBnbWFpbC5jb20iLCJ1c2VySUQiOiI1YjBlZDM1OThjYWNhOTM0NTg4MTcwMmYiLCJpYXQiOjE1MjkzMTU0MzEsImV4cCI6MTUyOTMxOTAzMX0.I_MGnCZKgPzl6LUcj6xrW_FGAI2Yqr66gRopgbEjK3U';
const projectid='5b19333ad3e7d2302ce4a830';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();


chai.use(chaiHttp);


//get all users test case

describe('/GET User', () => {
    it('it should GET all the Users', (done) => {
        chai.request('http://localhost:3000')
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


// //post project test case

// describe('/POST projects', () => {

//     it('it should POST a projects ', (done) => {
//         let project = {
//             name: "Project 1",
//             description: "project for all people description",
//             AdminId: "5b0ee1738caca93458817031",
//             startDate: "2018-05-01T00:00:00.000Z",
//             endDate: "2018-07-20T00:00:00.000Z"

//         }
//         chai.request('http://localhost:3000')
//             .post('/projects')
//             .set({ Authorization:'Bearer '+tok, Content_Type : 'application/json'  })
//             .send(project)
//             .end((err, res) => {
//                 res.should.have.status(201);
//                 res.body.should.be.a('object');
//                 done();
//             });
//     });
// });

// get project by Id test case

// describe('/GET/:id projects', () => {
//     it('it should GET a project by the given id', (done) => {
//         chai.request('http://localhost:3000')
//             .get('/projects/get/' + projectid)

//             .end((err, res) => {
//                 res.should.have.status(200);

//                 done();
//             });

//     });
// });


// //Update project test case

// describe('/PATCH/:id projects', () => {
//     it('it should UPDATE a project given the id', (done) => {
//         let projects = new Project(
//             {
//             name: "Project 6",
//             description: "Admin for all people description",
//             AdminId: "5b0ee1738caca93458817031",
//             startDate: "2018-05-01T00:00:00.000Z",
//             endDate: "2018-07-20T00:00:00.000Z"
//             })

//         chai.request('http://localhost:3000')
//             .patch('/projects/' +'5b19333ad3e7d2302ce4a830')
//             .send(projects)

//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//             });

//     });
// });


//Delete project test case

describe('/DELETE/:id project', () => {
    it('it should DELETE a project given the id', (done) => {

        chai.request('http://localhost:3000')
            .delete('/projects/' + "5b27820e914006410c501059")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
