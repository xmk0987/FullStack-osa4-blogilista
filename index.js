const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })

// +srv://vitikainenonni:Mummojapappa2@cluster0.xiawu1q.mongodb.net/blogiApp?retryWrites=true&w=majority
