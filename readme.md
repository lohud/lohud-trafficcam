# lohud Traffic Camera map

This traffic camera map pulls from 511NY's APIs and plots them out on a responsive map. There's a custom php file (not in repo) that pulls from 511NY and writes to the JSON, this php file is run through cron.

**Important note**: Image files from thruway.ny.gov cannot be embedded - Albany's DOT office has hotlink protection. The php file mentioned above parses through the API's response and downloads the relevant files and caches them locally. This can take a little time, our cron runs every 30 minutes.

### Version
1.1.2 - Now caches JSON every 30 minutes, with images saved locally
1.1.0 - Pulls from 511NY's API, caches JSON every minute
1.0.0 - Working traffic map, pulls from XML file and static URL links

### Technology

- Google maps
- Foundation by Zurb

### Contributors

 - Dwight Worley (@DwightsNews) -- original developer
 - Kai Teoh (@jkteoh)
