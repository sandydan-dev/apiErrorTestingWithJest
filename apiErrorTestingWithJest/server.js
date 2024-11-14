const { app, port } = require('./index')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})