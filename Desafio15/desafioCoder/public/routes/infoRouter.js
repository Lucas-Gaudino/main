const { Router } = require("express");
const parseArgs = require("minimist");
const os = require("os");

const infoRouter = Router();

infoRouter.get("/info", (req, res) => {
  try {
    const args = parseArgs(process.argv.slice(2));
    const info = {
      argumentos: JSON.stringify(args),
      directorioActual: process.cwd(),
      idProceso: process.pid,
      vNode: process.version,
      rutaEjecutable: process.execPath,
      sistemaOperativo: process.platform,
      memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
      processNum: os.cpus().length,
    };

    res.render("pages/info", info);
  } catch (error) {
    res.render(error.message);
  }
});

module.exports = infoRouter;
