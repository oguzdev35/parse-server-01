Parse.Cloud.define('hello', function(req, res) {
  return 'Hi';
});

Parse.Cloud.afterSave('TeamMember', async (req) => {
  if(req.context.notifyTeam){
    console.log("Notification works")
  }
})