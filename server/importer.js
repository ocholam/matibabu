require("bixbyte-frame");


var query = {};

var drugs               = fs.readFileSync(`${__dirname}/../schema/drugs.csv`,'utf8')
.trim()
.split('\n')
.map(row => row.split(';'))
.filter(e=>e[1]&&e[2])
.filter(e=>( e[1] != "BRAND NAME" ))
.map(e=>`('${e[1].replace(/'/ig, "").replace(/"/g,"")} - ${e[3].replace(/'/ig, "")}','${e[2].replace(/'/ig, "")}','p', 3,${ ( isNaN(e[5]) ? '' : e[5] ) },${ (isNaN(e[4]) ? '' : e[4] )} )`)
.join(',')
.trim()

query.drugs = `INSERT INTO services (title,description,type,offerer,rrp,purchase) VALUES ${drugs}`;
fs.writeFileSync(`${__dirname}/../schema/drugs.sql`,`${JSON.stringify(query.drugs).replace(/"/g,"").replace(/\\/g,"").replace(/,,/g,",0,").replace(/,\ \)/g,", 0 )")};`);


var labServices         = fs.readFileSync(`${__dirname}/../schema/lab_services.csv`,'utf8')
.trim()
.split('\n')
.map(row => row.split(';'))
.filter(e=>e[1])
.filter(e=>(e[1] != "LABORATORY SERVICES"))
.map(e=> `('${e[1].replace(/'/g,"").replace(/"/g,"")}','s', 3)`)
.join(',')

query.lab = `INSERT INTO services (title,type,offerer) VALUES ${labServices}`;
fs.writeFileSync(`${__dirname}/../schema/labs.sql`,`${JSON.stringify(query.lab).replace(/"/g,"").replace(/\\/g,"")};`);

var hospitalServices    = fs.readFileSync(`${__dirname}/../schema/hospital_services.csv`,'utf8')
.trim()
.split('\n')
.map(row => row.split(';'))
.filter(e=>e[1])
.filter(e=>(e[1] != "HOSPITAL SERVICES"))
.map(e=> `('${e[1].replace(/'/g,"").replace(/"/g,"")}','s',3)`)
.join(',')

query.hospital = `INSERT INTO services (title,type,offerer) VALUES ${hospitalServices}`;
fs.writeFileSync(`${__dirname}/../schema/hospital.sql`,`${JSON.stringify(query.hospital).replace(/"/g,"").replace(/\\/g,"")};`);

