var spawn = require('child_process').spawn;

module.exports = function(repo, targetPath, opts, cb) {

    opts = opts || {};

    var args = ['clone'];

    if (opts.shallow) {
        args.push('--depth');
        args.push('1');
    }

    args.push('--');
    args.push(repo);
    args.push(targetPath);

    var process = spawn('git', args);

    process.on('close', function(status) {
        if (status == 0) {
            cb();
        } else {
            cb(new Error("'git clone' failed with status " + status));
        }
    });

}