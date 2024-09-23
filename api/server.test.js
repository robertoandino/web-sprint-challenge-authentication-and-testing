const request = require("supertest")
const server = require("./server.js")
const db = require("../data/dbConfig.js")

beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async ()=>{
  await db("users").truncate()
  await request(server).post('/api/auth/register').send({ username: 'rob2', password: 'rob1' });
})

afterAll(async ()=>{
  await db.destroy()
})

describe("Author router functions", ()=>{
  describe("[POST] /api/auth/login", () => {
    
    it("Should return a Token on successful login", async ()=>{
      const res = await request(server).post('/api/auth/login').send({ username: 'rob2', password: 'rob1' })
      expect(res.status).toBe(200)
      expect(res.body.token).toBeDefined();
    });
  })
  describe("[POST] /api/auth/register", () => {
      it("Should register a new user", async ()=>{
        const res = await request(server).post('/api/auth/register').send({ username: 'rob1', password: 'rob1' })
        expect(res.status).toBe(201)
        expect(res.body.username).toBe('rob1')
        expect(res.body.password).toBeDefined()
      });
  })
})

// Write your tests here
//test('sanity', () => {
 // expect(true).toBe(false)
//})


