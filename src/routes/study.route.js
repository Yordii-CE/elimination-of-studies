const { connect, ObjectId } = require("../database");

const router = require("express").Router();

router.delete("/study/:studyId", async (req, res) => {
  try {
    const { studyId } = req.params;
    const school = await connect("school");
    const study = school.collection("study");
    const daily = school.collection("daily");
    const results = await study.find({ studyId }).toArray();
    const dailyResults = await daily
      .find({ questions: { $elemMatch: { studyId } } })
      .toArray();

    if (dailyResults.length >= 5) {
      res.json({
        status: 200,
        statusText:
          "Los diarios son mas de 5. No se eliminara el estudio en la coleccion Study",
      });
      return;
    }

    if (results.length > 0) {
      await study.deleteOne({ studyId });
      res.json({
        status: 200,
        statusText:
          "Estudio eliminado satisfactoriamente en la coleccion Study",
      });
    } else {
      res.json({
        status: 200,
        statusText: "Estudio no encontrado para eliminar en la coleccion Study",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      statusText: "Ocurrio un error al eliminar Estudio ",
    });
  }
});
module.exports = router;
