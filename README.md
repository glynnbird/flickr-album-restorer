# flickr-album-restorer

[In 2018, Flickr changed its terms of service](https://www.theverge.com/2018/11/1/18051950/flickr-1000-photo-limit-free-accounts-changes-pro-subscription-smugmug) to limit the number of photos on a free Flickr account to zero.
Those of us that have/had thousands of photos on Flickr, taking advantage of the previous limit (1TB of data free!) were left with a few of options:

1. Do nothing and see the account's storage limit fall to 1000 pictures.
2. [Upgrade to a paid Flickr plan](https://www.flickr.com/account/upgrade/pro) and continue using Flickr but with unlimited storage for a small monthly fee.
3. Download all of your photos and data and find it a new home.

This GitHub project contains a quick script to help if you choose option (3).

## Downloading your Flickr data

Extracting all of your Flickr data is simple. Visit your [Flickr Account page](https://www.flickr.com/account) and click the button on the bottom left. It takes Flickr several *DAYS* to bundle your data into a number of zip files ready to download. Keep checking back on your account page and the links will appear when it's done.

Download and extract all of the zipped data.

Move all of the "Account Data" files to a folder called "data" and all of the "Photos and Videos" files to a folder called "pictures".

- data - account and picture meta data
- pictures - the original photo or video files

## Where are all my albums?

I was disappointed to find that the downloaded pictures were not arranged in the albums as they were on the website. But fear not: a short Node.js script can recreate the albums on your computer but parsing the meta data and moving the pictures into named folders that map to the albums.

In the folder containing the `data` and `pictures` folders, place the `flicker.js` file from this GitHub repository. (You'll need [Node.js](https://nodejs.org/en/download/) installed on your machine too).

Run the utility:

```sh
$ node flickr.js
```

It will create an `albums` folder and create a sub-folder for each album. The original images will be moved into the relevant folders.

N.B You might find that some files are left behind in the `pictures` folder. This is because those photos/videos were not attached to any album. Feel free to copy those over to a new "miscellaneous" album.

## How does it work?

The `flickr.js` script simply parses the `data/albums.json` file and loops through the data structure creating sub-folders, figuring out the filename of the original photo from the photo id and moving files around. No data is deleted in the processed, but it is moved around. If you're concerned, make a backup before you run the script.

The code is open-source and free to use. Feel free to fork the project and modify to suit your needs.

