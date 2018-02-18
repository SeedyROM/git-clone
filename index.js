const spawn = require('child_process').spawn

module.exports = (repo, targetPath, opts, cb) => {
    if (typeof opts === 'function') {
        cb = opts
        opts = null
    }

    opts = opts || {}

    const git = opts.git || 'git'
    const args = []

    args.push('-C')
    args.push(targetPath || './')

    args.push('clone')

    if (opts.shallow) {
        args.push('--depth')
        args.push('1')
    }

    args.push(repo)

    const process = spawn(git, args)

    // process.stderr.on('data', (data) => {
    //     console.log(`Git output:\n${data}`)
    // })

    process.on('close', function(status) {
        if (status == 0) {
            if (opts.checkout) {
                _checkout()
            } else {
                cb && cb()    
            }
        } else {
            cb && cb(new Error("'git clone' failed with status " + status))
        }
    })

    function _checkout() {
        const args = ['checkout', opts.checkout]
        const process = spawn(git, args, { cwd: targetPath })
        process.on('close', function(status) {
            if (status == 0) {
                cb && cb()
            } else {
                cb && cb(new Error("'git checkout' failed with status " + status))
            }
        })
    }

}
