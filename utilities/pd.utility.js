// Parse Dashboard related utilities
const ParseDashboard = require('parse-dashboard');

const dashboardConstructor = (apps, users) => {
    return {
        dashboard: new ParseDashboard({
            "apps": apps,
            "trustProxy":1,
            "users": users
        }, true)
    }
}

module.exports = {
    dashboardConstructor
}