module.exports = function(target, source) {

    for(const field in target) {
        if(field in source)
            target[field] = source[field];
    }
}