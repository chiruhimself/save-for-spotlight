const os = require('os');
const fs = require('fs-extra');
var sizeOf = require('image-size');
try {
    if (os.platform() == "win32") {
        console.log("Platform : OK");
        var workingDirectory = os.homedir + "\\Windows Spotlight";
        var spotlightDirectory = os.homedir + "\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets";
        document.getElementById("startProcess").addEventListener('click', function () {
            try {
                fs.mkdirSync(workingDirectory, {
                    recursive: true
                });
                fs.readdir(spotlightDirectory, function (err, files) {
                    if (err) {
                        document.getElementById("msg").innerHTML = "Unable to scan directory: " + err;
                    }
                    files.forEach(function (file) {
                        var workingFilePath = workingDirectory + "\\" + file
                        var spotlightFilePath = spotlightDirectory + "\\" + file
                        fs.copySync(spotlightFilePath, workingFilePath);
                        var finalFilePath = workingDirectory + "\\" + file + ".jpg"
                        fs.renameSync(workingFilePath, finalFilePath, function (err) {
                            if (err) throw err
                        });
                        var dimensions = sizeOf(finalFilePath);
                        if (dimensions.width < 1080 || dimensions.height < 1080) {
                            fs.unlinkSync(finalFilePath)
                        }
                    });
                });
                document.getElementById("msg").innerHTML = 'Wallpapers saved at ' + os.homedir + "\\Windows Spotlight";
            } catch (err) {
                console.log(err);
            }
        });
    } else {
        document.getElementById("msg").innerHTML = "Error : This software is designed for Microsoft Windows 10";
    }
} catch (err) {
    console.log(err);
}