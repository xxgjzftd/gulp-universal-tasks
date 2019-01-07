declare module 'gulp-git' {
  export function add (options?: {}): NodeJS.ReadWriteStream
  export function commit (message: string, options?: {}): NodeJS.ReadWriteStream
  export function push (remote: string, branch: string, options?: {}, callback?: (err: NodeJS.ErrnoException) => void): NodeJS.ReadWriteStream
}