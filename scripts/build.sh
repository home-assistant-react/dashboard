#!/bin/bash

curFilePath=$(realpath "$BASH_SOURCE")
scriptsPath=$(dirname "$curFilePath")
rootPath=$(dirname "$scriptsPath")

cd "$rootPath"

rm -rf "$rootPath/dist"
rm -rf "$rootPath/apps/server/dist"
rm -rf "$rootPath/apps/dashboard/dist"

pnpm build:dashboard
pnpm build:server

mv "$rootPath/apps/server/dist" "$rootPath/dist"
mv "$rootPath/dist/index.js" "$rootPath/dist/server.js"
cp -r "$rootPath/apps/server/src/public" "$rootPath/dist/public"
cp -r "$rootPath/apps/dashboard/dist/"* "$rootPath/dist/public"

rm -rf "$rootPath/apps/dashboard/dist"

echo -e "#!/bin/bash\n\n#Start the dashboard server\n\nnode server.js -d ./ -p 8099" > "$rootPath/dist/start.sh"
echo -e "#!/bin/bash\n\n#Start the dashboard server\n\nnode server.js -d /homeassistant/react_dashboard -p 8099 -e addon" > "$rootPath/dist/start-addon.sh"
