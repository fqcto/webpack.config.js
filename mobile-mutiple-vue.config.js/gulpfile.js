const gulp = require('gulp');
const minimist = require('minimist');

var knownOptions = {
  string: 'env'
};

const options = minimist(process.argv.slice(2), knownOptions);

gulp.task('add-module', () => {
  if (!options.env) return false;
  return gulp.src('./src/common/moduleTemplate/**').pipe(gulp.dest(`./src/projects/${options.env}`));
});
