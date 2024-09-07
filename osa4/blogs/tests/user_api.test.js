const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test('username is mandatory', async () => {
    const invalidUser = {
        password: '123456789',
        name: 'some name'
    }

    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
        .expect(res => {
            assert.strictEqual(res.body.error, 'User validation failed: username: is mandatory!')
        })
})

test('username must contain at least threee characters', async () => {
    const invalidUser = {
        username: 't',
        password: '123456789',
        name: 'some name'
    }

    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
        .expect(res => {
            assert.strictEqual(res.body.error, 'User validation failed: username: must be at least 3 characters!')
        })
})


test('username must be unique', async () => {
    const duplicateUser = {
        username: 'testuser',
        password: '1244',
        name: 'some name'
    }

    await api
        .post('/api/users')
        .send(duplicateUser)
        .expect(400)
        .expect(res => {
            assert.strictEqual(res.body.error, 'Username must be unique')
        })

})


//testaa että on salasana

//testaa että siin on väh 3 merkkiä

test('password is mandatory', async () => {
    const invalidUser = {
        usename: 'nopassword',
        name: 'some name'
    }

    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
        .expect(res => {
            assert.strictEqual(res.body.error, 'Password is required!')
        })
})

test('password must contain at least threee characters', async () => {
    const invalidUser = {
        username: 'invaliduser',
        password: '1',
        name: 'some name'
    }

    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
        .expect(res => {
            assert.strictEqual(res.body.error, 'Password needs to be minimun three characters!')
        })
})
