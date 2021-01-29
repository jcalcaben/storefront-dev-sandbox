module.exports = targets => {
    targets.declare({
        socialLinks: new targets.types.SyncWaterfall(['socialLinks'])
    })
}