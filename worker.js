const axios = require('axios')
const fs = require('fs')

const getPrerelease = async () => {
    return await axios.get('https://raw.githubusercontent.com/ProjectIgnis/LFLists/master/Rush-Prerelease.lflist.conf')
}

const getContemporary = async () => {
    return await axios.get('https://raw.githubusercontent.com/ProjectIgnis/LFLists/master/Rush.lflist.conf')
}

const makeConfig = async (type) => {
    if (type === 'prerelease') {
        const data = await Promise.resolve(getPrerelease())
        
        let json = {}

        for (let row of data.data.split('\n')) {
            if (row.startsWith('16')) {
                const id = row.split(' ')[0]
                const amount = row.split(' ')[1]
                json[id] = parseInt(amount)
            }
        }

        fs.writeFileSync('prerelease.json', JSON.stringify(json))

        return 
    }

    if (type === 'contemporary') {
        const data = await Promise.resolve(getContemporary())
        
        let json = {}

        for (let row of data.data.split('\n')) {
            if (row.startsWith('16')) {
                const id = row.split(' ')[0]
                const amount = row.split(' ')[1]
                json[id] = parseInt(amount)
            }
        }

        fs.writeFileSync('contemporary.json', JSON.stringify(json))

        return 
    }

    if (type === 'highlander-prerelease') {
        const data = await Promise.resolve(getPrerelease())
        
        let json = {}

        for (let row of data.data.split('\n')) {
            if (row.startsWith('16')) {
                const id = row.split(' ')[0]
                const amount = 1
                json[id] = parseInt(amount)
            }
        }

        fs.writeFileSync('highlander-prerelease.json', JSON.stringify(json))

        return 
    }

    if (type === 'highlander-contemporary') {
        const data = await Promise.resolve(getContemporary())
        
        let json = {}

        for (let row of data.data.split('\n')) {
            if (row.startsWith('16')) {
                const id = row.split(' ')[0]
                const amount = 1
                json[id] = parseInt(amount)
            }
        }

        fs.writeFileSync('highlander-contemporary.json', JSON.stringify(json))

        return 
    }
}


module.exports = {
    makeConfig
}
