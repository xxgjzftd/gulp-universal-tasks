/// <reference types='./gulp-git' />

import minimist from 'minimist'
import pify from 'pify'
import gulp from 'gulp'
import gbump from 'gulp-bump'
import git from 'gulp-git'

const argv = minimist(process.argv, { alias: { t: 'type' }, default: { type: 'patch' } })

const type = argv.type

const bump = async () => gulp.src('package.json').pipe(gbump({ type })).pipe(gulp.dest('./'))

const add = async () => gulp.src('.').pipe(git.add())

const commit = async () => gulp.src('.').pipe(git.commit('prerelease'))

const push = async () => pify(git.push)('origin', 'master')

const prerelease = gulp.series(bump, add, commit, push)

export {
  bump,
  add,
  commit,
  push
}

export default prerelease
