import semver from 'semver'
import eslintPkg from 'eslint'

export function getMessageData(messageId, message) {
  return messageId && semver.satisfies(eslintPkg.version, '>= 4.15') ? { messageId } : { message }
}

export function log(message) {
  if (!/=-(f|-format)=/.test(process.argv.join('='))) {
    // eslint-disable-next-line no-console
    console.log(message)
  }
}

export function report(context, message, messageId, data) {
  context.report(Object.assign(getMessageData(messageId, message), data))
}
