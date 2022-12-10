process.env.TZ = 'UTC' 
d = new Date()
d.toLocaleTimeString()
console.log(""+d);