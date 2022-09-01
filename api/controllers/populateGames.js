const rateLimit = require('express-rate-limit');
const db = require('../../models');
const { default: axios } = require('axios');

// should be stored somewhere else (e.g configuration file/database)
const APP_STORE_URL = 'https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/ios.top100.json'
const GOOGLE_PLAY_URL = 'https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/android.top100.json'
const TIME_LIMIT = 1 * 60 * 1000
const IP_LIMIT = 2

const populateGames = async (req, res) => {
    const iosGames = []
    const androidGames = []
    try {
        const iosData = await axios({
            method: 'get',
            url: APP_STORE_URL,
            responseType: 'json',
        })
        
        iosGames.push(...parseData(iosData.data, 'ios'))        
    } catch (err) {
        console.error('Error fetching Appstore Data', err)
    }
    
    try {
        const androidData = await axios({
            method: 'get',
            url: GOOGLE_PLAY_URL,
            responseType: 'json',
        })
        
        androidGames.push(...parseData(androidData.data, 'android'))
    } catch (err) {
        console.error('Error fetching Google Play Data', err)
    }

    if (!iosGames.length && !androidGames.length) {
        return res.send(400).send('Empty data')
    }

    try {        
        if (iosGames.length) {
            await db.Game.bulkCreate(iosGames)
        }
        if (androidGames.length) {
            await db.Game.bulkCreate(androidGames)
        }

        return res.status(200).send('Success')
    } catch (err) {
        console.error('Error saving data in database', err)
        return res.status(400).send('Failure')
    }
  
}

const populateGamesMiddlewares = [
    rateLimit({
        windowMs: TIME_LIMIT,
        max: IP_LIMIT,
        message: 'Limit exceeded (2 max per IP per minute).'
      })
]

// data retreived is stored in a weird format
// []{name: string, publisher_id: string, os: string, app_id: string, bundle_id}[]
const parseData = (data, platform) => {
    const games = []
    
    for (let i = 0; i < 33; i++) {
        for (let j = 0; j < 3; j++) {
            games.push({
                publisherId: data[i][j].publisher_id,
                name: data[i][j].name,
                platform: 'ios',
                storeId: data[i][j].app_id,
                bundleId: data[i][j].bundle_id,
                appVersion: data[i][j].version,
                isPublished: true,
            })
        }
    }

    // add the 100th one
    games.push({
        publisherId: data[33][0].publisher_id,
        name: data[33][0].name,
        platform,
        storeId: data[33][0].appId,
        bundleId: data[33][0].bundle_id,
        appVersion: data[33][0].version,
        isPublished: true,
    })

    return games
}

module.exports = { populateGames, populateGamesMiddlewares }