// load fs & path libraries
const fs = require('fs')
const path = require('path')

// constants
const ALBUMS = 'albums'
const PICTURES = 'pictures'

// make 'albums' directory
fs.mkdirSync(ALBUMS)

// load albums json
const albums = require('./data/albums.json').albums

// album counter
let d = albums.length

// create index linking photo ids to filenames
const createFilenameIndex = function(directory) {
  var obj = {}
  // get list of photo filenames
  var fileList = fs.readdirSync(directory)

  // for each file
  for(var i in fileList) {
    // extract the id from the filename
    var filename = fileList[i]
    var match = filename.match(/([0-9]+)(_o)?\./)
    if (match) {
      // create an index where the key is thee 
      // photo id and the value is the filename
      var id = match[1]
      obj[id] = filename
    }
  }
  return obj
}

// create index of pictures so we can relate a photo
// id to its filename on disk
const filenameIndex = createFilenameIndex(PICTURES)

// loop through each album
for(let i in albums) {

  // make album directory
  const album = albums[i]
  const prefix = d.toString().padStart(4, '0')
  let  title = prefix + '_' + album.title
  d--
  title = title.replace(/\//g,'_').replace(/ /g,'_')
  const directory = path.join('.', ALBUMS, title)
  fs.mkdirSync(directory )
  console.log(album.title)

  // loop through each photo id in the album
  for(let j in album.photos) {

    // ignore photo id 0
    const photo = album.photos[j]
    if (photo !== '0') {

      // convert photo id to filename using our index      
      const photoFilename = filenameIndex[photo] 

      // try to copy the file to the album folder
      try {
         if (photoFilename) {
           const sourcePath = path.join('.', PICTURES, photoFilename)
           const destPath = path.join(directory, photoFilename)
           // change thie to fs.copyFileSync to copy instead of move
           fs.renameSync(sourcePath, destPath)
         } else {
           console.error(photo)
         }
      } catch (e) {
        console.error('ERROR:', photoFilename)
      }
    }
  }
}
