let webProps = {
    facingMode: "environment",
    resizeWidth: 224,
    resizeHeight: 224,
    centerCrop: false
}
const webcamElement = document.getElementById('webcam');
function init()
{
    window.fetch = WHATWGFetch.fetch;
    console.log("Listening to device");
    document.addEventListener("deviceready", app, false);
}

async function app()
{
    tf.setBackend("webgl", true);
    tf.setBackend("cpu", false);
    console.log("loading");
    model = await loadModel();

    const webcam = await tf.data.webcam(webcamElement, webProps);
    while (true) {
        let img = await webcam.capture();
        img = img.expandDims(0);
        result = await model.predictOnBatch(img).dataSync();
        document.getElementById("console").innerText = result;
        img.dispose();
        await tf.nextFrame();
    }

}
async function loadModel() {
	try {
	    tfModelCache = await tf.loadLayersModel("https://raw.githubusercontent.com/DragoSupremo00/tfcordova/master/det/model.json");
	    return tfModelCache
	} catch (err) {
	  console.log(err)
	}
}

init();

//"https://raw.githubusercontent.com/DragoSupremo00/tfcordova/master/detector/model.json"