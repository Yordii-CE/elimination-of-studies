const { connect, ObjectId } = require("../database");

const router = require("express").Router();

router.delete("/daily/:studyId", async (req, res) => {
  try {
    const { studyId } = req.params;
    const school = await connect("school");
    const daily = school.collection("daily");
    const results = await daily
      .find({ questions: { $elemMatch: { studyId } } })
      .toArray();

    if (results.length >= 5) {
      res.json({
        status: 200,
        statusText:
          "Los diarios son mas de 5. No se eliminaran los registros en la colleccion Daily",
      });
      return;
    }

    if (results.length > 0) {
      await daily.deleteMany({ questions: { $elemMatch: { studyId } } });
      res.json({
        status: 200,
        statusText: "Diarios eliminados satifactoriamente",
      });
    } else {
      res.json({
        status: 200,
        statusText: "Diarios no econtrados para eliminar",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      statusText: "Ocurrio un error al eliminar Dailies",
    });
  }
});

module.exports = router;
