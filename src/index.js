const { connect } = require("./database");
const studyData = require("../data/study.json");
const dailyData = require("../data/daily.json");

const app = require("./app");
const PORT = 3000 || env.process.PORT;
app.listen(PORT, async () => {
  const school = await connect("school");
  const daily = school.collection("daily");
  const study = school.collection("study");

  // Insertar datos de colleciones (puede tambien importarlos a MongodbCompass)
  await daily.insertMany(dailyData.dailies);
  await study.insertMany(studyData.studies);

  console.log(`Site url: ", 'http://localhost:${PORT}`);
});
