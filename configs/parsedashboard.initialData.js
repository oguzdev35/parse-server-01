const apps = [
    {
      "serverURL": "http://localhost:2000/p/master",
      "appId": "master44444",
      "masterKey": process.env.MASTER_KEY,
      "appName": "Master"
    },
    {
      "serverURL": "http://localhost:2000/p/ins01",
      "appId": "ins01",
      "masterKey": process.env.MASTER_KEY,
      "appName": "Ins01"
    }
  ];
  
  const users = [
    {
      "user": "admin",
      "pass": "admin"
    }
  ]

module.exports = {
    apps, users
}