#!/bin/bash
default() {
    startAPI
}
installAPI() {
    npm install --prefix api
    echo "API Packages Installed"
}

installClient() {
    cd client && yarn add
    echo "Client Packages Installed"
}
startAPI() {
    cd api && npm run-script test
}

startProd() {
    cd api && npm run-script prod

}

"${@:-default}"
