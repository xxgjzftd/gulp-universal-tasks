import gulp from 'gulp'
import ts from 'gulp-typescript'
import sourcemaps from 'gulp-sourcemaps'
import merge from 'merge2'
import del from 'del'

import prerelease from './src'

const project = ts.createProject('tsconfig.json')

const clean = async () => del(['lib/'])

const compile = async () => {
  const res = await project.src().pipe(sourcemaps.init()).pipe(project())
  return merge(
    res.dts.pipe(gulp.dest('./lib/types')),
    res.js.pipe(sourcemaps.write('./maps')).pipe(gulp.dest('./lib'))
  )
}

const build = gulp.series(
  clean,
  compile
)

const watch = () => {
  gulp.watch(
    'src/**',
    { ignoreInitial: false },
    compile
  )
}

const release = gulp.series(build, prerelease)

export {
  clean,
  compile,
  build,
  watch,
  release
}

export * from './src'

export default build
