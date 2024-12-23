# DB - Database

Sounds database in JSON format.

## Build Process

We build ```./src/db/json/sounds.json``` dynamically in the following
manner:

1) We collect all filenames in ```./src/assets/sounds/``` that match
the sound file type given in ```./src/db/src/soundfiletype.txt```.

2) We build ```./src/db/json/sounds.json``` using the sounds found
in step one, and we append extra information that opionally exists
in ```./src/db/src/soundsinfos.txt```. We also join data found in
```./src/db/src/licenses.txt``` and ```./src/db/src/soundgroups.txt```.

## Possible Improvements

- Allow loading multiple different sound file types simultaneously.
- Allow adding the sound name directly in the sound file name on top
of having it possibly in the ```soundsinfos.txt``` file. In this case,
the one in ```soundsinfos.txt``` should be used if both are present.
- Allow creating isolated drop-in folders that contain sounds and
their own ```soundsinfos.txt``` files for adding sound collections.
(This is for the desktop version.)
