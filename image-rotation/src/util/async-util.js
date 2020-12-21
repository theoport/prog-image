import log from '../common/logger.js'

const AsyncUtils = {

    // Handle partial promise failures: https://davidwalsh.name/promises-results
    async resolvePromisesIgnoreFailure(promises) {
        let errorOccured = false
        const results = await Promise.all(promises.map(p => p.catch(err => {
            log.warn(err.message)
            errorOccured = true
            return null
        })))
        return {resolvedPromises: results.filter(e => e !== null), errorOccured}
    }
}

export default AsyncUtils
