/*
*
* Env vars:
* IMAGE_NAME, ENVIRONMENT, CHART_VERSION, CHART_DIR
*
*/
const fs = require('fs');
const Mustache = require('mustache');

const templateProperties = {
    getChartName: function () {
        return `${process.env.IMAGE_NAME}-${process.env.ENVIRONMENT}`;
    },
    chartVersion: process.env.CHART_VERSION
};

try {
    const templateData = fs.readFileSync(`${process.env.CHART_DIR}/Chart.yaml.mustache`, 'utf8');
    const output = Mustache.render(templateData, templateProperties);
    fs.writeFileSync(`${process.env.CHART_DIR}/Chart.yaml`, output);
    const outputWrittenData = fs.readFileSync(`${process.env.CHART_DIR}/Chart.yaml`, 'utf8');
    console.log("*** Generated chart: ***")
    console.log(outputWrittenData);
} catch (err) {
    console.error(err);
}