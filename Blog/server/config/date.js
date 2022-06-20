
const newTime = function (date) {
    const newTime = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(
        /T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return newTime
}
module.exports = newTime